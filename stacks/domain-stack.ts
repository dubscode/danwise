import { StackContext } from 'sst/constructs';

export function DomainStack({ app, stack }: StackContext) {
  const DOMAIN_NAME = 'danwise.dev';

  const SITE: Record<string, string> = {
    dev: `dev.${DOMAIN_NAME}`,
    prod: DOMAIN_NAME,
    staging: `staging.${DOMAIN_NAME}`,
  };

  const domain = SITE[stack.stage] || `${stack.stage}.${DOMAIN_NAME}`;

  const apiDomain = `api.${domain}`;

  const mailDomain = `mail.${domain}`;

  const allowOrigins = !app.local
    ? [`https://${domain}`, `https://${apiDomain}`]
    : [`https://${domain}`, `https://${apiDomain}`, 'http://localhost:3000'];

  stack.addOutputs({
    AllowOrigins: allowOrigins.join(','),
    ApiDomain: apiDomain,
    Domain: domain,
    MailDomain: mailDomain,
  });

  return {
    allowOrigins,
    apiDomain,
    domain,
    hostedZone: DOMAIN_NAME,
    mailDomain,
  };
}
