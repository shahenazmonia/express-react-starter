export default {
  ClientRoutes: [
    { route: "/", label: "MAIN_PAGE" },
    { route: "/blog", label: "BLOG" },
    { route: "/sessions", label: "SESSIONS" },
    { route: "/messages", label: "MY_MESSAGES" },
    {
      route: null,
      label: "ME_SPECIAL",
      subRoutes: [
        {
          route: "/account",
          label: "MY_PROFILE",
          key: "/account"
        },
        {
          label: "MY_BALANCE",
          key: "/balance"
        },
        {
          label: "MY_FOOD_PLAN",
          key: "/foodPlan"
        },
        {
          label: "MY_TESTS",
          key: "/tests"
        }
      ]
    }
  ],
  AdminRoutes: [
    { route: "/admin/dashboard", label: "DASHBOARD" },
    { route: "/admin/blog", label: "BLOG" },
    { route: "/admin/clientList", label: "CLIENT_LIST" },
    { route: "/admin/sessions", label: "SESSIONS" },
    { route: "/admin/messages", label: "MY_MESSAGES" },
    {
      route: null,
      label: "ME_SPECIAL",
      subRoutes: [
        { route: "/admin/service", key: "/admin/service", label: "CATEGORIES" },
        { route: "/admin/subscription", key: "/admin/subscription", label: "SUBSCRIPTIONS" },
        { route: "/admin/clinic", key: "/admin/clinic", label: "CLINIC_LIST" },
        { route: "/admin/counselorList", key: "/admin/counselorList", label: "COUNSELOR_LIST" },
        { route: "/admin/balance", key: "/admin/balance", label: "MY_BALANCE" },
        { key: "cancel-refund", label: "CANCEL_REFUND" }
      ]
    },
    {
      route: null,
      label: "ACCOUNTING",
      subRoutes: [
        { route: "/admin/accounts", key: "/admin/accounts", label: "ACCOUNTS" },
        { route: "/admin/transactions", key: "/admin/transactions", label: "TRANSACTIONS" }
      ]
    }
  ],
  ClinicRoutes: [
    { route: "/clinic/dashboard", label: "DASHBOARD" },
    { route: "/clinic/blog", label: "BLOG" },
    { route: "/clinic/clientList", label: "CLIENT_LIST" },
    { route: "/clinic/sessions", label: "SESSIONS" },
    { route: "/clinic/messages", label: "MY_MESSAGES" },
    {
      route: null,
      label: "ME_SPECIAL",
      subRoutes: [
        { route: "/clinic/service", key: "/clinic/service", label: "CATEGORIES" },
        { route: "/clinic/subscription", key: "/clinic/subscription", label: "SUBSCRIPTIONS" },
        { route: "/clinic/invitation", key: "/clinic/invitation", label: "ADD_COUNSELOR" },
        { route: "/clinic/counselorList", key: "/clinic/counselorList", label: "COUNSELOR_LIST" },
        { route: "/clinic/account", key: "/clinic/account", label: "MY_ACCOUNT" },
        {
          subRoutes: [
            { route: "/clinic/balance", key: "/clinic/balance", label: "BALANCE_COUNSELOR" },
            { key: "platformBalance", label: "BALANCE_PLATFORM" }
          ],
          label: "MY_BALANCE"
        }
      ]
    }
  ],
  CounselorRoutes: [
    { route: "/counselor/blog", label: "BLOG" },
    { route: "/counselor/sessions", label: "SESSIONS" },
    { route: "/counselor/messages", label: "MY_MESSAGES" },
    {
      route: null,
      label: "ME_SPECIAL",
      subRoutes: [
        {
          route: "/counselor/account",
          key: "/counselor/account",
          label: "COUNSELOR_PROFILE_ACCOUNT"
        },
        {
          route: "/counselor/profile",
          key: "/counselor/profile",
          label: "MY_PROFILE"
        },
        {
          route: "/counselor/calendarPlan",
          key: "/counselor/calendarPlan",
          label: "MY_CALENDAR_PLAN"
        },
        { key: "balance", label: "MY_BALANCE" }
      ]
    }
  ],
  DefaultRoutes: [
    { route: "/", label: "MAIN_PAGE" },
    { route: "/about", label: "ABOUT_US" },
    { route: "/blog", label: "BLOG" },
    { route: "/faq", label: "FAQ" }
  ]
};
