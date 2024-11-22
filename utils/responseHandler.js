// utils/responseHandler.js

class ResponseHandler {
    // 200 OK - Standard success response
    static success(res, data = {}, message = 'Request successful') {
      return res.status(200).json({
        success: true,
        message,
        data,
      });
    }
  
    // 201 Created - For successful resource creation
    static created(res, data = {}, message = 'Resource created successfully') {
      return res.status(201).json({
        success: true,
        message,
        data,
      });
    }
  
    // 400 Bad Request - Client sent invalid data
    static badRequest(res, message = 'Invalid request') {
      return res.status(400).json({
        success: false,
        message,
      });
    }
  
    // 401 Unauthorized - Client is not authenticated
    static unauthorized(res, message = 'Unauthorized access') {
      return res.status(401).json({
        success: false,
        message,
      });
    }
  
    // 403 Forbidden - Client does not have permission
    static forbidden(res, message = 'Access forbidden') {
      return res.status(403).json({
        success: false,
        message,
      });
    }
  
    // 404 Not Found - Resource not found
    static notFound(res, message = 'Resource not found') {
      return res.status(404).json({
        success: false,
        message,
      });
    }

    /// method not allow
    static methodNotAllow(res) {
      return res.status(405).json({
        success: false,
        message:"Method not allow",
      });
    }
  
    // 500 Internal Server Error - Server encountered an error
    static serverError(res, error = 'Internal server error') {
      return res.status(500).json({
        success: false,
        message: typeof error === 'string' ? error : error.message,
        error: typeof error === 'object' && error.stack ? error.stack : error,
      });
    }

  }
  
  module.exports = ResponseHandler;
  