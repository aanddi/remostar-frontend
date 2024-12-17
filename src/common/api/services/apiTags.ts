enum ApiTags {
  GET_CONTRACTOR_RIBBON = 'get_contractor_ribbon',
  GET_CONTRACTOR_PROFILE = 'get_contractor_profile',
  GET_TENDERS_RIBBON = 'get_tenders_ribbon',
  GET_TENDER = 'get_tender',
  GET_USER_PROFILE = 'get_user_profile',
  GET_MY_TENDERS = 'get_my_tenders',
  GET_INFO_TENDER = 'get_info_tender',
  GET_CONTRACTOR_INFO = 'get_contractor_info',
  GET_SERVICE = 'get_service',
  GET_PORTFOLIO = 'get_portfolio',
  GET_REVIEWS_PROFILE = 'get_reviews_profile',
  GET_REVIEW_BY_ID_PROFILE = 'get_reviews_by_id_profile',
  GET_CHECK_REVIEW = 'get_check_reviews',
  GET_OBJECTS_LIST = 'get_objects_list',
  GET_OBJECT_INFO = 'get_object_info',
  GET_OWNERS_LIST = 'get_owners_list',
  GET_EMPLOYEES_LIST = 'get_employees_list',
  GET_REPORTS = 'get_reports',
  GET_FILES_LIST = 'get_files_list',
  GET_FILE_CONTENT = 'get_file_content',

  CREATE_TENDER = 'create_tender',
  CREATE_SERVICE_CONTRACTOR = 'create_portfolio_contractor',
  CREATE_PORTFOLIO_CONTRACTOR = 'create_portfolio_contractor',
  CREATE_REVIEW = 'create_review',
  CREATE_OBJECT = 'create_object',
  CREATE_REPORT = 'create_report',

  EDIT_PROFILE_USER = 'edit_profile_user',
  EDIT_TENDER = 'edit_tender',
  EDIT_INFO_CONTRACTOR = 'edit_info_contractor',
  EDIT_SERVICE_CONTRACTOR = 'edit_service_contractor',
  EDIT_PORTFOLIO_CONTRACTOR = 'edit_portfolio_contractor',
  EDIT_REVIEW = 'edit_review',
  EDIT_OBJECT_INFO = 'edit_object_info',

  DELETE_TENDER = 'delete_tender',
  DELETE_SERVICE_CONTRACTOR = 'delete_service_contractor',
  DELETE_PORTFOLIO_CONTRACTOR = 'delete_portfolio_contractor',
  DELETE_REVIEW = 'delete_review',

  UPLOAD_FILE = 'upload_file',
}

export default ApiTags;
