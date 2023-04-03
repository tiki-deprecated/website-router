/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url: URL = new URL(request.url);
    if (url.pathname === env.AUTHORIZE_PATH) {
      const rewrite: URL = new URL(env.AUTHORIZE_L0_URL);
      url.host = rewrite.host;
      url.pathname = rewrite.pathname;
    } else if (url.pathname.startsWith(env.LIST_LICENSE_PATH)) {
      const rewrite: URL = new URL(env.LIST_LICENSE_L0_URL);
      url.host = rewrite.host;
      url.pathname = rewrite.pathname;
    } else if (url.pathname.startsWith(env.LICENSE_PATH)) {
      const rewrite: URL = new URL(env.LICENSE_L0_URL);
      url.host = rewrite.host;
      url.pathname = url.pathname.replace(env.LICENSE_PATH, rewrite.pathname);
    } else if (url.pathname.startsWith(env.TITLE_PATH)) {
      const rewrite: URL = new URL(env.TITLE_L0_URL);
      url.host = rewrite.host;
      url.pathname = url.pathname.replace(env.TITLE_PATH, rewrite.pathname);
    }

    return fetch(new Request(url, request));
  },
};
