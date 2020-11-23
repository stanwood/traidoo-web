import {
  LayoutA,
  LayoutB,
  LayoutC,
  LayoutD,
  LayoutE,
  LayoutF,
  LayoutG,
  LayoutH,
} from "./components/Layout/Layouts";
import Checkout from "./pages/Checkout";
import { CheckoutProvider } from "./pages/Checkout/context";
import CheckoutSuccessPage from "./pages/CheckoutSuccess";
import CheckoutSummaryPage from "./pages/CheckoutSummary";
import ContactPage from "./pages/Contact";
import DeliveryAddress from "./pages/DeliveryAddress";
import ImprintPage from "./pages/Imprint";
import JobsPage from "./pages/Jobs";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { PurchasesPage, SalesPage } from "./pages/Orders";
import PasswordChangePage from "./pages/PasswordChange";
import PasswordReset from "./pages/PasswordReset";
import PasswordSet from "./pages/PasswordSet";
import PricesPage from "./pages/Prices";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import ProductAddPage from "./pages/ProductAdd";
import ProductDetails from "./pages/ProductDetails";
import ProductEditPage from "./pages/ProductEdit";
import Products from "./pages/Products";
import CompanyProfile from "./pages/Profile/Company";
import CompanyDocuments from "./pages/Profile/Documents";
import PersonalProfile from "./pages/Profile/Personal";
import {
  RegistrationFormPage,
  RegistrationSuccessPage,
} from "./pages/Registration";
import RegistrationConfirmPage from "./pages/RegistrationConfirm";
import AddRoutePage from "./pages/Routes/Add";
import RouteDetailsPage from "./pages/Routes/Details";
import EditRoutePage from "./pages/Routes/Edit";
import RoutesListPage from "./pages/Routes/List";
import Seller from "./pages/Seller";
import SellerProductDetailsPage from "./pages/SellerProductDetail";
import SellerProductsListPage from "./pages/SellerProducts";
import TermsOfServicePage from "./pages/TermsOfServices";

export const publicRoutes = [
  {
    key: "main",
    path: "/",
    layout: LayoutB,
    exact: true,
    component: Products,
    activeTab: 0,
  },
  {
    key: "login",
    path: "/login",
    layout: LayoutA,
    exact: true,
    component: Login,
  },
  {
    key: "registration",
    path: "/registration",
    layout: LayoutA,
    exact: true,
    component: RegistrationFormPage,
  },
  {
    key: "registrationConfirm",
    path: "/registration/:uid/:token",
    layout: LayoutA,
    exact: true,
    component: RegistrationConfirmPage,
  },
  {
    key: "registrationSuccess",
    path: "/registration/success",
    layout: LayoutA,
    exact: true,
    component: RegistrationSuccessPage,
  },
  {
    key: "passwordReset",
    path: "/password/reset",
    layout: LayoutA,
    exact: true,
    component: PasswordReset,
  },
  {
    key: "passwordSet",
    path: "/password/reset/:uid/:token",
    layout: LayoutA,
    exact: true,
    component: PasswordSet,
  },
  {
    key: "products",
    path: "/products",
    layout: LayoutB,
    exact: true,
    component: Products,
    activeTab: 0,
  },
  {
    key: "productDetail",
    path: "/products/:id",
    layout: LayoutC,
    exact: true,
    component: ProductDetails,
    activeTab: 0,
  },
  {
    key: "seller",
    path: "/sellers/:id",
    layout: LayoutC,
    exact: true,
    component: Seller,
    activeTab: 0,
  },
  {
    key: "termsOfService",
    path: "/terms-of-services",
    layout: LayoutA,
    exact: true,
    component: TermsOfServicePage,
  },
  {
    key: "contact",
    path: "/contact",
    layout: LayoutA,
    exact: true,
    component: ContactPage,
  },
  {
    key: "imprint",
    path: "/imprint",
    layout: LayoutA,
    exact: true,
    component: ImprintPage,
  },
  {
    key: "prices",
    path: "/prices",
    layout: LayoutA,
    exact: true,
    component: PricesPage,
  },
  {
    key: "privactPolicy",
    path: "/privacy-policy",
    layout: LayoutA,
    exact: true,
    component: PrivacyPolicyPage,
  },
];

export const privateRoutes = [
  {
    key: "logout",
    path: "/logout",
    layout: LayoutA,
    exact: true,
    component: Logout,
  },
  {
    key: "sellerProducts",
    path: "/seller/products",
    layout: LayoutD,
    exact: true,
    component: SellerProductsListPage,
    activeTab: 1,
  },
  {
    key: "sellerProductsAdd",
    path: "/seller/products/add",
    layout: LayoutD,
    exact: true,
    component: ProductAddPage,
    activeTab: 1,
  },
  {
    key: "sellerProductDetails",
    path: "/seller/products/:id",
    layout: LayoutD,
    exact: true,
    component: SellerProductDetailsPage,
    activeTab: 1,
  },
  {
    key: "sellerProductEdit",
    path: "/seller/products/:id/edit",
    layout: LayoutD,
    exact: true,
    component: ProductEditPage,
    activeTab: 1,
  },
  {
    key: "sellerRoutes",
    path: "/seller/logistic/routes",
    layout: LayoutE,
    exact: true,
    component: RoutesListPage,
    activeTab: 2,
  },
  {
    key: "sellerRouteAdd",
    path: "/seller/logistic/routes/add",
    layout: LayoutE,
    exact: true,
    component: AddRoutePage,
    activeTab: 2,
  },
  {
    key: "sellerRouteDetails",
    path: "/seller/logistic/routes/:id",
    layout: LayoutE,
    exact: true,
    component: RouteDetailsPage,
    activeTab: 2,
  },
  {
    key: "sellerRouteEdit",
    path: "/seller/logistic/routes/:id/edit",
    layout: LayoutE,
    exact: true,
    component: EditRoutePage,
    activeTab: 2,
  },
  {
    key: "sellerJobs",
    path: "/seller/logistic/jobs",
    layout: LayoutE,
    exact: true,
    component: JobsPage,
    activeTab: 2,
  },
  {
    key: "purchases",
    path: "/history/orders/purchases",
    layout: LayoutF,
    exact: true,
    component: PurchasesPage,
    activeTab: 0,
  },
  {
    key: "sales",
    path: "/history/orders/sales",
    layout: LayoutF,
    exact: true,
    component: SalesPage,
    activeTab: 1,
  },
  {
    key: "checkout",
    path: "/checkout",
    layout: LayoutA,
    exact: true,
    component: Checkout,
    provider: CheckoutProvider,
  },
  {
    key: "checkoutSummary",
    path: "/checkout/summary",
    layout: LayoutA,
    exact: true,
    component: CheckoutSummaryPage,
  },
  {
    key: "checkoutSuccess",
    path: "/checkout/success",
    layout: LayoutH,
    exact: true,
    component: CheckoutSuccessPage,
  },
  {
    key: "profileCompanyDeliveryAddress",
    path: "/profile/company/deliveryAddress",
    layout: LayoutG,
    exact: true,
    component: DeliveryAddress,
    activeTab: 1,
  },
  {
    key: "profileCompany",
    path: "/profile/company",
    layout: LayoutG,
    exact: true,
    component: CompanyProfile,
    activeTab: 1,
  },
  {
    key: "profilePersonal",
    path: "/profile/personal",
    layout: LayoutG,
    exact: true,
    component: PersonalProfile,
    activeTab: 0,
  },
  {
    key: "profileDocuments",
    path: "/profile/documents",
    layout: LayoutG,
    exact: true,
    component: CompanyDocuments,
    activeTab: 2,
  },
  {
    key: "profilePassword",
    path: "/profile/password",
    layout: LayoutG,
    exact: true,
    component: PasswordChangePage,
  },
];
