"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = void 0;
const emailTemplate = (payload) => {
    const { subject, message, to, from, image } = payload;
    let action = (payload === null || payload === void 0 ? void 0 : payload.action) && (Array.isArray(payload === null || payload === void 0 ? void 0 : payload.action) ? payload === null || payload === void 0 ? void 0 : payload.action : [payload === null || payload === void 0 ? void 0 : payload.action]);
    const appName = 'Event Wallets';
    const defaultEmail = process.env.EMAIL_USER;
    const defaultImage = 'https://app.tor.us/v1.38.10/img/login-bg-new-2.96ae03fd.svg';
    return `<!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Email from ${(from === null || from === void 0 ? void 0 : from.name) || appName}</title>
      <style>
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important;
          }
    
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important;
          }
    
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important;
          }
    
          table[class=body] .content {
            padding: 0 !important;
          }
    
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important;
          }
    
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important;
          }
    
          table[class=body] .btn table {
            width: 100% !important;
          }
    
          table[class=body] .btn a {
            width: 100% !important;
          }
    
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important;
          }
        }
    
        @media all {
          .ExternalClass {
            width: 100%;
          }
    
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          }
    
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important;
          }
    
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
    
          .wrapper td {
            line-height: 1;
          }
        }
      </style>
    </head>    
    <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
      <table class="body" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
        <tbody>
          <tr>
            <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;"></td>
            <td class="container" style="font-family: sans-serif; font-size: 16px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
              <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
                <!-- START CENTERED WHITE CONTAINER--><span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">
                  Message
                  from ${(from === null || from === void 0 ? void 0 : from.name) || appName}.</span>
                <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"></div>
                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                  <thead>
                    <tr>
                      <td><img src=${image ? '"' + image + '"' : defaultImage} alt="Logo" style="max-height: 80px; height: auto; width: auto;"></td>
                    </tr>
                    <tr>
                      <td>
                        <hr style="border: 1px solid #d8d8d8;">
                      </td>
                    </tr>
                  </thead>
                  <!-- START MAIN CONTENT AREA-->
                  <tbody>
                    <tr>
                      <td class="wrapper" style="font-family: sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                          <tbody>
                            <tr>
                              <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;">
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0;">
                                  Hi ${(to === null || to === void 0 ? void 0 : to.name) || ''},
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td><br></td>
                            </tr>
                            <tr>
                              <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;">
                                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-family: sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                          <tbody>
                                            <tr>
                                              <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;">
                                                <p>${message || ''}</p>
                                              </td>
                                            </tr>
                                           ${action
        ? action.map(x => {
            return `<tr>
                                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;">
                                                  <a href="${(x === null || x === void 0 ? void 0 : x.link) || ''}" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">${(x === null || x === void 0 ? void 0 : x.text) || ''}</a>
                                                </td>
                                            </tr>`;
        })
        : ''}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table><br>
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                                  If you have any questions or concerns, please don't hesitate to get in touch with us at
                                  <a href="mailto:${(from === null || from === void 0 ? void 0 : from.email) || defaultEmail}?subject=Re: ${subject || ''}">${(from === null || from === void 0 ? void 0 : from.email) || defaultEmail}</a>.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <!-- END MAIN CONTENT AREA-->
                    <!-- START FOOTER-->
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                  <tbody>
                    <tr>
                      <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"><span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">
                          ${appName} Inc,
                          Made with 🧡 in Denver CO</span></td>
                    </tr>
                    <tr>
                      <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">Copyright<a style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">
                         ${new Date().getFullYear()}
                        </a>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- END FOOTER-->
              <!-- END CENTERED WHITE CONTAINER-->
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>`;
};
exports.emailTemplate = emailTemplate;
//# sourceMappingURL=template.js.map