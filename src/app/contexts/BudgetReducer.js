export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.type]: [
            ...(state.categories[action.payload.type] || []),
            action.payload.name,
          ],
        },
        budgetLimits: {
          ...state.budgetLimits,
          [action.payload.name]: 0,
        },
      };
    case "SET_BUDGET_LIMIT":
      return {
        ...state,
        budgetLimits: {
          ...state.budgetLimits,
          [action.payload.category]: action.payload.limit,
        },
      };
    case "ADD_INCOME":
      return {
        ...state,
        income: {
          ...state.income,
          [action.payload.category]: [
            ...(state.income[action.payload.category] || []),
            {
              description: action.payload.description,
              amount: action.payload.amount,
            },
          ],
        },
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.payload.category]: [
            ...(state.expenses[action.payload.category] || []),
            {
              description: action.payload.description,
              amount: action.payload.amount,
            },
          ],
        },
      };
    case "REMOVE_INCOME":
      return {
        ...state,
        income: {
          ...state.income,
          [action.payload.category]: state.income[
            action.payload.category
          ].filter((_, index) => index !== action.payload.index),
        },
      };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.payload.category]: state.expenses[
            action.payload.category
          ].filter((_, index) => index !== action.payload.index),
        },
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
