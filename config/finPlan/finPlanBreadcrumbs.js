import finPlanPages from '../../constants/enums/finPlanPages';

export const pageMappings = {
  CREATE_FIN_PLAN_INSURANCE_SUCCESS: finPlanPages.finPlanInsurance,
  CREATE_FIN_PLAN_QUESTIONS_SUCCESS: finPlanPages.finPlanFinancialQuestions,
  CREATE_FIN_PLAN_GOAL_SUCCESS: finPlanPages.finPlanGoals,
  CREATE_FIN_PLAN_INCOME_SUCCESS: finPlanPages.finPlanIncome,
  CREATE_FIN_PLAN_LIABILITY_SUCCESS: finPlanPages.finPlanLiabilities,
  CREATE_FIN_PLAN_ASSET_SUCCESS: finPlanPages.finPlanAssets,
  CREATE_FIN_PLAN_TRANSACTIONS_SUCCESS: finPlanPages.finPlanTransactionReview,
  CREATE_FIN_PLAN_BILLS_SUCCESS: finPlanPages.finPlanBillReview,
  CREATE_FIN_PLAN_PERSONAL_DETAILS_SUCCESS: finPlanPages.finPlanPersonalDetails,
  UPDATE_FIN_PLAN_PAYMENT_SUCCESS: finPlanPages.finPlanPayment,
  CREATE_FIN_PLAN_PAYMENT_SUCCESS: finPlanPages.finPlanPayment,
  UPDATE_FIN_PLAN_TAX_RETURN_SUCCESS: finPlanPages.finPlanSuccess
};
