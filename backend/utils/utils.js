import validator from 'validator';

export const  validateUrl = (value) => {
  return validator.isURL(value, {
    protocols: ['http', 'https', 'ftp'],
    require_protocol: true,
    require_valid_protocol: true,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
  });
}