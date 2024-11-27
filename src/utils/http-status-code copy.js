/**
 * HTTP status codes
 *
 * This module exports a set of constants representing HTTP status codes.
 * These codes are used to indicate the outcome of an HTTP request.
 */

/**
 * Informational responses (100-199)
 */
export const HTTP_CONTINUE = 100; // The server has received the request headers and the client should proceed to send the request body.
export const HTTP_SWITCHING_PROTOCOLS = 101; // The server is switching protocols according to the Upgrade header.
export const HTTP_PROCESSING = 102; // The server has accepted the request and is processing it. (RFC2518)
export const HTTP_EARLY_HINTS = 103; // The server is providing early hints to the client. (RFC8297)

/**
 * Successful responses (200-299)
 */
export const HTTP_OK = 200; // The request has succeeded.
export const HTTP_CREATED = 201; // The request has been fulfilled and resulted in a new resource being created.
export const HTTP_ACCEPTED = 202; // The request has been accepted for processing, but the processing has not been completed.
export const HTTP_NON_AUTHORITATIVE_INFORMATION = 203; // The server is a transforming proxy that received a 200 OK from its origin.
export const HTTP_NO_CONTENT = 204; // The server has successfully fulfilled the request, but there is no additional content to return.
export const HTTP_RESET_CONTENT = 205; // The server has fulfilled the request and the user agent should reset the document view.
export const HTTP_PARTIAL_CONTENT = 206; // The server is delivering only part of the resource due to a range request.
export const HTTP_MULTI_STATUS = 207; // The message body contains a list of status codes for multiple resources. (RFC4918)
export const HTTP_ALREADY_REPORTED = 208; // The server has already received and processed the request. (RFC5842)
export const HTTP_IM_USED = 226; // The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance. (RFC3229)

/**
 * Redirection messages (300-399)
 */
export const HTTP_MULTIPLE_CHOICES = 300; // The request has more than one possible response.
export const HTTP_MOVED_PERMANENTLY = 301; // The requested resource has been permanently moved to a new location.
export const HTTP_FOUND = 302; // The requested resource has been temporarily moved to a new location.
export const HTTP_SEE_OTHER = 303; // The response to the request can be found under a different URI.
export const HTTP_NOT_MODIFIED = 304; // The requested resource has not been modified since the last request.
export const HTTP_USE_PROXY = 305; // The requested resource must be accessed through the proxy given by the Location field.
export const HTTP_RESERVED = 306; // Reserved for future use.
export const HTTP_TEMPORARY_REDIRECT = 307; // The requested resource has been temporarily moved to a new location.
export const HTTP_PERMANENTLY_REDIRECT = 308; // The requested resource has been permanently moved to a new location. (RFC7238)

/**
 * Client error responses (400-499)
 */
export const HTTP_BAD_REQUEST = 400; // The request could not be understood by the server due to malformed syntax.
export const HTTP_UNAUTHORIZED = 401; // The request requires user authentication.
export const HTTP_PAYMENT_REQUIRED = 402; // The request is for a resource that requires payment.
export const HTTP_FORBIDDEN = 403; // The server understood the request, but is refusing to authorize it.
export const HTTP_NOT_FOUND = 404; // The requested resource could not be found.
export const HTTP_METHOD_NOT_ALLOWED = 405; // The request method is not supported by the server for the requested resource.
export const HTTP_NOT_ACCEPTABLE = 406; // The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.
export const HTTP_PROXY_AUTHENTICATION_REQUIRED = 407; // The client must first authenticate itself with the proxy.
export const HTTP_REQUEST_TIMEOUT = 408; // The server timed out waiting for the request.
export const HTTP_CONFLICT = 409; // The request conflicts with the current state of the resource.
export const HTTP_GONE = 410; // The requested resource is no longer available and will not be available again.
export const HTTP_LENGTH_REQUIRED = 411; // The request did not specify the length of its content.
export const HTTP_PRECONDITION_FAILED = 412; // The server does not meet one of the preconditions that the requester put on the request.
export const HTTP_REQUEST_ENTITY_TOO_LARGE = 413; // The request is larger than the server is willing or able to process.
export const HTTP_REQUEST_URI_TOO_LONG = 414; // The URI requested by the client is longer than the server is willing to interpret.
export const HTTP_UNSUPPORTED_MEDIA_TYPE = 415; // The request entity has a media type which the server or resource does not support.
export const HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416; // The request included a Range request-header field, and the server is unable or unwilling to fulfill that Range request.
export const HTTP_EXPECTATION_FAILED = 417; // The expectation given in the Expect request-header field could not be met by the server.
export const HTTP_I_AM_A_TEAPOT = 418; // The server refuses to brew coffee because it is a teapot. (RFC2324)
export const HTTP_MISDIRECTED_REQUEST = 421; // The request was directed at a server that is not able to produce a response. (RFC7540)
export const HTTP_UNPROCESSABLE_ENTITY = 422; // The request was well-formed but was unable to be processed due to semantic errors. (RFC4918)
export const HTTP_LOCKED = 423; // The resource that is being accessed is locked. (RFC4918)
export const HTTP_FAILED_DEPENDENCY = 424; // The request failed due to failure of a previous request. (RFC4918)
export const HTTP_TOO_EARLY = 425; // The server is unwilling to risk processing a request that may be replayed. (RFC-ietf-httpbis-replay-04)
export const HTTP_UPGRADE_REQUIRED = 426; // The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. (RFC2817)
export const HTTP_PRECONDITION_REQUIRED = 428; // The origin server requires the request to be conditional. (RFC6585)
export const HTTP_TOO_MANY_REQUESTS = 429; // The user has sent too many requests in a given amount of time. (RFC6585)
export const HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431; // The server is unwilling to process the request because its header fields are too large. (RFC6585)
export const HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451; // The server is denying access to the resource as a consequence of a legal demand. (RFC7725)

/**
 * Server error responses (500-599)
 */
export const HTTP_INTERNAL_SERVER_ERROR = 500; // The server encountered an unexpected condition that prevented it from fulfilling the request.
export const HTTP_NOT_IMPLEMENTED = 501; // The server does not support the functionality required to fulfill the request.
export const HTTP_BAD_GATEWAY = 502; // The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
export const HTTP_SERVICE_UNAVAILABLE = 503; // The server is currently unavailable (e.g., due to a server overload or maintenance).
export const HTTP_GATEWAY_TIMEOUT = 504; // The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
export const HTTP_VERSION_NOT_SUPPORTED = 505; // The server does not support, or refuses to support, the HTTP protocol version that was used in the request message.
export const HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506; // The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process. (RFC2295)
export const HTTP_INSUFFICIENT_STORAGE = 507; // The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. (RFC4918)
export const HTTP_LOOP_DETECTED = 508; // The server detected an infinite loop while processing the request. (RFC5842)
export const HTTP_NOT_EXTENDED = 510; // Further extensions to the request are required for the server to fulfill it. (RFC2774)
export const HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511; // The client needs to authenticate to gain network access. (RFC6585)