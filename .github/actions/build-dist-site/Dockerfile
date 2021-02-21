FROM node:lts
LABEL author="Cisco Mind Bogglers"
LABEL version="1.0.0"

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    bats \
    build-essential \
    ca-certificates \
    curl \
    libffi6 \
    make \
    shellcheck \
    libffi6 \
    git-all 

COPY entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]