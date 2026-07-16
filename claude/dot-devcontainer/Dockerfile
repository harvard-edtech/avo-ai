# TypeScript dev container for the Avo (Claude Code) setup.
# Based on the official Node dev container image.
FROM mcr.microsoft.com/devcontainers/typescript-node

ARG TZ
ENV TZ="$TZ"

# Tools used by the firewall script and general development.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get install -y --no-install-recommends \
    iptables \
    ipset \
    iproute2 \
    dnsutils \
    aggregate \
    jq \
    git \
    curl \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install Claude Code globally.
RUN npm install -g @anthropic-ai/claude-code

# Persist bash history across rebuilds (paired with the volume mount).
RUN mkdir -p /commandhistory \
  && touch /commandhistory/.bash_history \
  && chown -R node:node /commandhistory \
  && echo 'export PROMPT_COMMAND="history -a"' >> /home/node/.bashrc \
  && echo 'export HISTFILE=/commandhistory/.bash_history' >> /home/node/.bashrc

# Install the firewall script and let the node user run it via sudo without a password.
COPY init-firewall.sh /usr/local/bin/init-firewall.sh
RUN chmod +x /usr/local/bin/init-firewall.sh \
  && echo 'node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh' > /etc/sudoers.d/node-firewall \
  && chmod 0440 /etc/sudoers.d/node-firewall

USER node
WORKDIR /workspace
