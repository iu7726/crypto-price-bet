export interface MailContent {
  type: string;
  value: string;
}

export const rawMessage = (email: string) => {
  return {
    type: 'text/html',
    value: `
      <table width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td align="center">

              <table width="504px;" style="background: #ffffff; border-radius: 20px; border: 1px solid #E1E2E6; padding: 48px;">
                <tbody>
                  <tr>
                    <td>
                      <img alt="" width="66" height="32" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7wXpFgX6iLKVAFQ-ru-nrJYSTxWugjXn_tu8UD1ERFfVFN-utIL09UOOMDzo7O3ODqrBeiSMoDYNKqXYpYcob1xtjzZINF3tCQbmd-9znP2tTCAyULieASfJjMJoNt18Gyv-JC2sbtC4IHqOLk2CpcmqgXRSoKAUY9URIkwHEoGzHGiGcCeupG6uJ/s1600/OG_logo.png">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style="text-align: center; margin:40px 0px;">
                        <img alt="" style="width:504px; height:264px; border-radius: 10px;" src="https://blogger.googleusercontent.com/img/a/AVvXsEic0PXQwzzhivCn7CMdvT5I-R1tve1KjsAo6M68JXjXYlRwQKfTXWQdb6syhXt89DFBRBti50CsJZdGzIff0X8cNyinTt7DqxJnkmyPj7rZfbM7cDh_mIJWLluF_3h9sqRhbVL69iOWOoNAYBev4AHtIRMfwvjTPJskZ0EKWh0zeGsFR3SQW1oNBpIJ"/>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div id="sub-title" type="text" placeholder="Sub Title" style="font-family: Arial, Helvetica, sans-serif; font-size: 36px; line-height: 120px; font-weight: 600; text-align: center; height: 120px; margin: 0; width: 100%; border-radius: 20px; color: #1A1B1C; ">
                        Only 3 days away 🙌
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td >
                      <div id="description" style="border-radius: 20px; color: #1A1B1C; font-family: Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 400; line-height: 24px; margin: 0px; ">
                        <div>

                          <div style="margin-top: 40px;">
                            <div>
                              April 3rd is only 3 days away!
                            </div>

                            <div><br></div>

                            <div>
                              Starting this Monday, April 3rd, you'll have 30 days to make your predictions and earn crystals, our event point system you can exchange for prizes.
                            </div>

                            <div><br></div>

                            <div>
                              Here's a breakdown of The Crypto Whisperer:
                            </div>

                            <div><br></div>

                            <div>
                              <ul>
                                <li>
                                  For 30 days, you'll be presented with 3 randomly selected cryptocurrencies. Choose one of them.
                                </li>

                                <li>
                                  We give you a starting price (USD), and you'll need to determine if the ending price will be greater than or lower than the starting price.
                                </li>

                                <li>
                                  If you correctly guess the price movement, you'll receive crystals.
                                </li>

                                <li>
                                  Collect crystals and exchange them for a reward at the end of the 30 days.
                                </li>
                              </ul>
                            </div>

                            <div><br></div>

                            <div>
                              Simple enough but remember that you only have 30 days to participate, so don't miss your chance to win big.
                            </div>

                            <div><br></div>

                            <div>
                              To learn more about the challenge, visit The Crypto Whisperer page.
                            </div>

                            <div><br></div>

                          </div>
                        </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 20px; " align="center">
                      <a href="https://og.xyz/event/whisperer" target="_blank" style="text-decoration: none; color: #1A1B1C; width: 189px; height: 40px; border-radius: 40px; background: #3CE646; gap: 8px; padding: 10px 20px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; font-size: 16px; line-height: 20px; color: #1A1B1C; text-decoration: unset; border: 0px solid #E1E2E6;">
                        Visit Crypto Whisperer
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td >
                      <div id="description" style="border-radius: 20px; color: #1A1B1C; font-family: Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 400; line-height: 24px; margin: 0px; width:504px;">

                        <div><br></div>

                        <div>
                          One more thing. We’ll periodically include some of our most popular posts in our emails—sometimes funny 😬 memes too. Feel free to select some of them to read! See you on the 3rd!
                        </div>

                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="border-bottom: 1px solid #e1e1e6; padding-top: 40px;">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style="margin-top: 40px; ">
                        <table style="font-family: Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 600; margin: 0; color: #1A1B1C;">
                          <tr>
                            <td align="left" width="45px;">
                              <img style="width:45px; height:22px; vertical-align: middle;" alt="" src="https://blogger.googleusercontent.com/img/a/AVvXsEjrzWBbfCDCU3S7EW1_wIeUPxcdQeotN-WkGsO2AtNWHCMVYmlZitydOQEAxfIXLAIpeB09IqGIzob0kqB2B9phcXiIRO7joFc2HycMrSv4qaY2yGN7QsOiUu5piYUJo4MkMcKTfj7UK6BFlubLVIc0F3vtrsWAMQH2C385wCb5pJuJ0zFV8ExtTicm" />
                            </td>
                            <td align="left">
                              Popular on OG
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td >
                      <div id="description" style="border-radius: 20px; border: 0px solid rgb(225, 226, 230); font-family: Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 400; line-height: 24px; margin: 0px; ">
                        <div>

                          <table width="100%">

                            <tr>
                              <td align="left" width="70%" style="padding-top:24px;">
                                <p style="margin: 0; font-size: 19px; color:#1A1A1C;">
                                  Over The Last 2 Weeks
                                </p>
                                <p style="margin: 0; font-size: 15px; color:#838488;">
                                  ThomFromVeronaBeach · 10:53 AM · Mar 31, 2023
                                </p>
                              </td>

                              <td align="right" width="30%" style="padding-top:24px;">
                                <a style="text-decoration: none; color:#2DBF35; font-weight: 600; padding: 10px 20px; width:105px; height:40px; background: #EEF8EE; border-radius: 40px; border:none; font-size: 16px;" href="https://og.xyz/post/31869" target="_blank">
                                  Read now
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td align="left" width="70%" style="padding-top:24px;">
                                <p style="margin: 0; font-size: 19px; color:#1A1A1C;">
                                  AI IS ADVANCING AT AN ALARMING RATE!
                                </p>
                                <p style="margin: 0; font-size: 15px; color:#838488;">
                                  onichan · 10:30 AM · Mar 31, 2023
                                </p>
                              </td>

                              <td align="right" width="30%" style="padding-top:24px;">
                                <a style="text-decoration: none; color:#2DBF35; font-weight: 600; padding: 10px 20px; width:105px; height:40px; background: #EEF8EE; border-radius: 40px; border:none; font-size: 16px;" href="https://og.xyz/post/31863" target="_blank">
                                  Read now
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td align="left" width="70%" style="padding-top:24px;">
                                <p style="margin: 0; font-size: 19px; color:#1A1A1C;">
                                  Metamask has denied the rumor of an upcoming ...
                                </p>
                                <p style="margin: 0; font-size: 15px; color:#838488;">
                                  Cheastnut · 11:07 AM · Mar 30, 2023
                                </p>
                              </td>

                              <td align="right" width="30%" style="padding-top:24px;">
                                <a style="text-decoration: none; color:#2DBF35; font-weight: 600; padding: 10px 20px; width:105px; height:40px; background: #EEF8EE; border-radius: 40px; border:none; font-size: 16px;" href="https://og.xyz/post/31306" target="_blank">
                                  Read now
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td align="left" width="70%" style="padding-top:24px;">
                                <p style="margin: 0; font-size: 19px; color:#1A1A1C;">
                                  Sam Bankman-Fried (SBF) with a new indictment
                                </p>
                                <p style="margin: 0; font-size: 15px; color:#838488;">
                                  mamasan · 4:53 PM · Mar 29, 2023
                                </p>
                              </td>

                              <td align="right" width="30%" style="padding-top:24px;">
                                <a style="text-decoration: none; color:#2DBF35; font-weight: 600; padding: 10px 20px; width:105px; height:40px; background: #EEF8EE; border-radius: 40px; border:none; font-size: 16px;" href="https://og.xyz/post/30772" target="_blank">
                                  Read now
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td align="left" width="70%" style="padding-top:24px;">
                                <p style="margin: 0; font-size: 19px; color:#1A1A1C;">
                                  A NEW SUPERPOWER IS FORMING!
                                </p>
                                <p style="margin: 0; font-size: 15px; color:#838488;">
                                  TylenolC · 11:20 AM · Mar 31, 2023
                                </p>
                              </td>

                              <td align="right" width="30%" style="padding-top:24px;">
                                <a style="text-decoration: none; color:#2DBF35; font-weight: 600; padding: 10px 20px; width:105px; height:40px; background: #EEF8EE; border-radius: 40px; border:none; font-size: 16px;" href="https://og.xyz/post/31873" target="_blank">
                                  Read now
                                </a>
                              </td>
                            </tr>

                          </table>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="border-bottom: 1px solid #e1e1e6; padding-top: 40px;">
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div style="margin-top:40px; background: #F7F7F9; border-radius: 12px; padding: 24px 24px 40px 24px; width:456px; color: #1A1B1C;">
                        <div >
                          <table style="font-family: Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 600; margin: 0; border: 0px solid #E1E2E6; ">
                            <tr>
                              <td align="left" width="45px;">
                                <img style="width:45px; height:22px; vertical-align: middle" alt="" src="https://blogger.googleusercontent.com/img/a/AVvXsEjum4j3DMbHmVPAsSwvZl3DxtjTqu4VJL4_-cdN0agXmPKB6bV6Uz40Ynjp7wept9yhzlOVMneAAMC3FFCHBeN-q2lOafhajyIpzfkSuogGiriWFWfPHdt7BtywqgnJDQFPmv-GPbrq2feCEw-gLdcfmmIWO_5kl8EqZlmbbjm23RgjIc9UQyBRE77S" />
                              </td>
                              <td align="left">
                                Meme Spotlight
                              </td>
                            </tr>
                          </table>
                        </div>

                        <div id="description" style="border-radius: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 19px; font-weight: 400; line-height: 24px; margin: 0px;">
                          <div style="margin-top: 24px; ">
                            Check out some memes while you take your ☕️ break or during your daily routine 🚽.
                          </div>
                          <div style="margin-top: 36px; text-align: center;">
                            <img alt="" style="width:456px; height:237px; border-radius: 12px;"
                            src="https://blogger.googleusercontent.com/img/a/AVvXsEhN-xNXt2MX77onxHI5gCgwkDHgvUSLCOgCa7xkpu5u8Y6lWuj1tiVhaW8bjPkjsKXd1HtpfLYo4oP3Xo87EOT86j1NdyVpXUjV3QfrZmC4h5HBFqKyZm_iZXrdg0hziMjayD7s5MtbOkuI-mJlAMu7dyiza9PTKmeqhQodUbAqtLz_hRAZCwdROTxA" />
                            <p style="text-align: center; margin: 0; color:#838488; font-size: 15px;">
                              uploaded by BabyShark · 4:20 PM · Mar 28, 2023
                            </p>
                          </div>
                        </div>

                        <div style="margin-top:24px; text-align: center;">
                          <a href="https://og.xyz/meme" style="text-decoration: none; width: 140px; height: 40px; border-radius: 40px; background: #3CE646; gap: 8px; padding: 10px 20px; font-family: Arial, Helvetica, sans-serif; font-weight: 600; font-size: 16px; line-height: 20px; color: #1A1B1C; text-decoration: unset;">
                            Explore Memes
                          </a>
                        </div>
                      </div>

                      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 19px; line-height: 120px; font-weight: 400; height: 120px; color: #1A1B1C;">
                        That’s it for now! We hope we see you on the 3rd!
                      </div>

                    </td>
                  </tr>

                  <tr>
                    <td style="border-bottom: 1px solid #e1e1e6; ">
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 20px 0;">
                      <table width="100%">
                        <tr>

                          <td align="left" width="50%">
                            <img alt="" width="50" height="24" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtJOCD5IxW55k4RW_moRHnDIOUx91sbQl1shyDzCmdeB02sCjmaCD_PtztmZKkpquHao1wDP4wQM6bLQwgZdLWbMbArT0I3uU1AdJM00cmi1jdvqgpWZQccljxfLyCKyDR31_qRs1rW2zBloMreHIQOjnvbs-rbatDmi7tV0PxUClpMMD-lKhqBRG1/s1600/OG_logo_black.png" loading="lazy">
                          </td>

                          <td align="right" width="50%">
                            <a target="_blank" href="https://u31374548.ct.sendgrid.net/ls/click?upn=79szFbGIEWeEMCFhncFCyHAYAnp-2FMhA-2Blq6AD4gfBHtjqU7IRuaxc2E14BMzb2MIQWtl_8qn0IT-2BBXiOuyuSGBnSMJK7nskiFtYjZjmwkqsTyQyqERdfP8p7gfICN4AnqcsYVye29kDRoqlyz-2BXPr9UNvtiS7O-2FfS6b1UUMGboPUTBqXwpQfG9PEiNZ2iBXHDD0bMrTtbSjVCVkj-2BabrgLy4kLwXlN-2Fqtig0piEVwRvX1R5D8cXtrrazgm9Pbit-2F8ZS9Zp6UL75F-2F3OgROn70VIBH9w-3D-3D" rel="noreferrer noopener"style="text-decoration: none;">
                              <img alt="" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjbAakL5GrN7eA0ogVf0t-O9SYiSKWSiGEQwLWbsZfmYCo7OomX-zVnOoAEYDNxAG3W2AgXexncokLdNOI1lYG4Bt6FiUCBZmOUTTKFElYrqRiQao1qqnVLe7dIwxBmuKT2gFA_zjqL0TD8TWRhuEznp-etIXRJ1APFjE4BJ7H8WbhgWNQ8wfN2zLg0/s1600/twitter.png" loading="lazy"style="margin-right: 20px; width: 24px; height: 24px;">
                            </a>
                          </td>

                          <td align="right" width="50%">
                            <a target="_blank" href="http://url8771.og.xyz/ls/click?upn=fmFH1uDrKg8bpBhahX7GnnIhTtP8gGuaGYjrV9U04FA-3D-LV3_zhHrTngT9NhcC0xtbNPwveuo6OcYUw-2BcVF9-2FBGi6BrUKWbFUehepTFQ7FheUGVYFLiJnCWvJD7Zfs6m-2BLZiEiEDivstUa1ayMKLLapq9ylmW3hUx9-2BPWqXmuB5bPlMBn-2FQ-2Fz3CxZueXB8BKOg-2Bn44pXCE1S5PW7VZXS1tNTLRDYovowBrTQVXUj3YRALmF7aD1ZHf0LMqKcWqgXtojYQGA-3D-3D" rel="noreferrer noopener"style="text-decoration: none;">
                              <img alt="" src="https://blogger.googleusercontent.com/img/a/AVvXsEgITuuJ_LzpWEiGLFRx6KKwU6UtRF2cWVaLcOtn-xYg289MM3iHdKCk9SRTwsSAR0pnRERk6MiCUpt0iVGEsI1pdAhNpc1v26joT9D0o-0H7TJMTiMuiEZnocX6glm2gwjSW-qAFBd-JIglHh_hQKhVdSaceHykLW16n1ufrBbBg2StEKOMcUw6-QHf" loading="lazy"style="margin-right: 20px; width: 24px; height: 24px;">
                            </a>
                          </td>

                          <td align="right" width="50%">
                            <a target="_blank" href="https://www.instagram.com/OGXYZOFFICIAL/" rel="noreferrer noopener"style="text-decoration: none;">
                              <img alt="" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEax8ofqlOHv9AjpnANZxffSNrD6jh1etfZx8MK1skm9scqO_pKR7X9S6AbVAVbaW1aghJA7bT4Qwc-urn3IQQHkkBKm-rI5iusBI7zBb8yoNorMnBI-XkP6MPl4EcjNRZAJEIc6QmO5wEW9LeJ0YzQ6dGgmCCL3m4a_vYmP_naR2s5EtDePdeuquH/s1600/instagram.png" loading="lazy"style="margin-right: 20px; width: 24px; height: 24px;">
                            </a>
                          </td>

                          <td align="right" width="50%">
                            <a target="_blank" href="https://u31374548.ct.sendgrid.net/ls/click?upn=79szFbGIEWeEMCFhncFCyPLLhTNu5E7Kd4zTMo5cKpNmg0DVPdkVGQDfPYmzc720Ixkw_8qn0IT-2BBXiOuyuSGBnSMJK7nskiFtYjZjmwkqsTyQyqERdfP8p7gfICN4AnqcsYVxkHKa5mPHrAlWV6opMrs3fp1R18YrrbrMyTY7uxsKev3WD1hgLFwT-2BDTmSQQpwMs8aZEFWK3x-2Bv3UPVr1rbaby1jEAmoV3hEeDqYMTaLHR-2BhJ5JAp2JwotKA9XA-2B5fmkqznBpff9AVnu80M5fV8l1w-3D-3D" rel="noreferrer noopener"style="text-decoration: none;">
                              <img alt="" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv2rulpMXT3ggTrH7dkD2pPn1cOv02QyR9P5b8QIkMEtgqys283oCLJTjk7zEIYQdaySETLOip3hPe9BPE4_-EArLqsUMfPgoKrrwbk6STpxwVc2WYT8IBYpDyIglzsL8hAHmjx8IywtZL-cfBH0C5rVSuut5DeDjAYMN-qif85pSSW0YRM-d4ioNB/w48-h48/linkedin.png" loading="lazy"style="width: 24px; height: 24px;">
                            </a>
                          </td>

                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <a href="https://u31374548.ct.sendgrid.net/ls/click?upn=79szFbGIEWeEMCFhncFCyMld8d6INcjzqF0uJDVr5mE-3DI2ng_8qn0IT-2BBXiOuyuSGBnSMJK7nskiFtYjZjmwkqsTyQyqERdfP8p7gfICN4AnqcsYVYfkz6O0T-2F2K6GMqLrccfQM0MjxhKy1txTR-2BS37JRCUN-2FikmJpayMOXOFB9XbnslqrknkwDoF8MO1UyDKRbxzra0A1wRZVo0dYMa3iN5uV2ywTduQVBAtlc4WEth-2Fti4aF9DbjtAUSFjK7YI-2Bu5sfow-3D-3D" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 20px; color: #1a1a1c; text-decoration: underline; " rel="noreferrer noopener">
                      OG.xyz</a>
                      <a href="https://u31374548.ct.sendgrid.net/ls/click?upn=79szFbGIEWeEMCFhncFCyBpidgeOTzr5PwGyvcO2wXKwul2UnLZxBSQ6rihQXbBFG24g_8qn0IT-2BBXiOuyuSGBnSMJK7nskiFtYjZjmwkqsTyQyqERdfP8p7gfICN4AnqcsYVtm20UQsxC-2B9pd2-2FUa-2F46QsRhm2D2qYNzqoeaWEL-2BFmJ3eV2TCaAIk50LiqvO3ik4A3CpdEgWcY-2BL2MpA9lemEZuQNNRfLc3QL7vrVDpis0TxjlFg1iA5pYhH6E6tgyfnqi6c8DY5O02OQjUp1yRLcw-3D-3D" target="_blank" style="font-family: Arial, Helvetica, sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 20px; color: #1a1a1c; text-decoration: underline; " rel="noreferrer noopener">
                      Privacy Policy</a>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-top:24px;">
                      <p style="font-family: Arial, Helvetica, sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 20px; color: #838388; margin: 0; ">
                        If you didn’t subscribe to OG.xyz, select
                          <a href="https://api.og.xyz/user/unsubscribe?email=${email}" target="_blank" style="
                            font-family: Arial, Helvetica, sans-serif; font-style: normal; font-weight: 400; font-size: 16px; line-height: 20px; color: #838388; text-decoration: underline; ">
                            unsubscribe
                          </a>
                        to be removed from our mailing list.</p>
                    </td>
                  </tr>

                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    `
  }
}
