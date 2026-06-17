#!/usr/bin/env bash
# Checkstyle による Java コードの静的解析スクリプト
# 注意: Gradle 8.14 は Java 25 環境で build script の再コンパイルに非互換性があるため、
#       Checkstyle は Gradle プラグインではなく本スクリプトで実行する。

set -e

CHECKSTYLE_VERSION="10.21.4"
JAR_NAME="checkstyle-${CHECKSTYLE_VERSION}-all.jar"
CACHE_DIR="${HOME}/.cache/checkstyle"
JAR_PATH="${CACHE_DIR}/${JAR_NAME}"
DOWNLOAD_URL="https://github.com/checkstyle/checkstyle/releases/download/checkstyle-${CHECKSTYLE_VERSION}/${JAR_NAME}"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config/checkstyle/checkstyle.xml"
SOURCE_DIR="${SCRIPT_DIR}/src/main/java"

mkdir -p "${CACHE_DIR}"

if [ ! -f "${JAR_PATH}" ]; then
  echo "Checkstyle JAR をダウンロード中: ${DOWNLOAD_URL}"
  curl -fL -o "${JAR_PATH}" "${DOWNLOAD_URL}"
  echo "ダウンロード完了"
fi

echo "Checkstyle を実行中..."
java -jar "${JAR_PATH}" \
  -c "${CONFIG_FILE}" \
  "${SOURCE_DIR}"

echo "Checkstyle 完了: 違反なし"
