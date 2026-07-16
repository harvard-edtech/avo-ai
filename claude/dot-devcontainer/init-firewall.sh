#!/bin/bash
# init-firewall.sh
# Default-deny egress firewall for the Avo (Claude Code) dev container.
# Blocks all outbound traffic except a short allow-list of domains needed
# for development. Runs at container creation via postCreateCommand.
set -euo pipefail
IFS=$'\n\t'

# Introductino

echo "✨ I'm Avo. Let's go! ✨"

# --- Domains allowed for outbound HTTPS/HTTP -------------------------------

# Add your own internal registries or APIs here as needed.
ALLOWED_DOMAINS=(
  "api.anthropic.com"
  "statsig.anthropic.com"
  "sentry.io"
  "registry.npmjs.org"
  "github.com"
  "codeload.github.com"
  "objects.githubusercontent.com"
  "harvard-edtech.github.io"
)

echo "Flushing existing rules..."
iptables -F
iptables -X
iptables -t nat -F
iptables -t nat -X
iptables -t mangle -F
iptables -t mangle -X

# --- Baseline allows --------------------------------------------------------

# Loopback.
iptables -A INPUT  -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Allow established/related return traffic.
iptables -A INPUT  -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow DNS (needed to resolve the allow-list domains).
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 53 -j ACCEPT

# --- Resolve and allow the allow-list --------------------------------------

# Use an ipset so multiple A records per domain are handled cleanly.
ipset create allowed-domains hash:ip 2>/dev/null || ipset flush allowed-domains

for domain in "${ALLOWED_DOMAINS[@]}"; do
  echo "Resolving ${domain}..."
  ips=$(dig +short A "${domain}" | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' || true)
  if [ -z "${ips}" ]; then
    echo "  WARNING: could not resolve ${domain}; skipping."
    continue
  fi
  while read -r ip; do
    [ -n "${ip}" ] && ipset add allowed-domains "${ip}" 2>/dev/null || true
  done <<< "${ips}"
done

iptables -A OUTPUT -m set --match-set allowed-domains dst -j ACCEPT

# --- Default policy: deny everything else ----------------------------------

iptables -P INPUT   DROP
iptables -P FORWARD DROP
iptables -P OUTPUT  DROP

echo "Firewall configured. Allowed domains:"
printf '  - %s\n' "${ALLOWED_DOMAINS[@]}"

# --- Sanity checks ----------------------------------------------------------

if curl -fsS --max-time 5 https://api.anthropic.com/ >/dev/null 2>&1; then
  echo "OK: api.anthropic.com reachable."
else
  echo "NOTE: api.anthropic.com check returned non-zero (may be fine if it needs auth)."
fi

if curl -fsS --max-time 5 https://example.com/ >/dev/null 2>&1; then
  echo "ERROR: reached a non-allow-listed host; firewall is NOT restricting egress." >&2
  exit 1
else
  echo "OK: non-allow-listed host correctly blocked."
fi
