import React from "react";
import { Helmet } from "react-helmet";
import { Route, Router, Switch } from "react-router-dom";
import {
  ExtendedStringifyOptions,
  QueryParamProvider,
  transformSearchStringJsonSafe,
} from "use-query-params";
import Layout from "./components/Layout";
import Config from "./config";
import CartProvider from "./contexts/CartContext";
import UserProvider from "./contexts/UserContext";
import { Provider as AppProvider } from "./core/context";
import history from "./core/history";
import Checkout from "./pages/Checkout";
import CheckoutSummaryPage from "./pages/CheckoutSummary";
import ContactPage from "./pages/Contact";
import DeliveriesPage from "./pages/Deliveries";
import DeliveryAddress from "./pages/DeliveryAddress";
import ImprintPage from "./pages/Imprint";
import JobsPage from "./pages/Jobs";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import OrderPage from "./pages/Order";
import OrdersPage from "./pages/Orders";
import PasswordChangePage from "./pages/PasswordChange";
import PasswordReset from "./pages/PasswordReset";
import PasswordSet from "./pages/PasswordSet";
import PricesPage from "./pages/Prices";
import PrivacyPolicyPage from "./pages/PrivacyPolicy";
import ProductAddPage from "./pages/ProductAdd";
import ProductDetail from "./pages/ProductDetail";
import ProductEditPage from "./pages/ProductEdit";
import Products from "./pages/Products";
import ProfilePage from "./pages/Profile";
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
import Seller from "./pages/Seller/Seller.component";
import SellerProductDetailsPage from "./pages/SellerProductDetail";
import SellerProductsListPage from "./pages/SellerProducts";
import TermsOfServicePage from "./pages/TermsOfServices";

const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

const App: React.FC = () => {
  return (
    <Router history={history}>
      <QueryParamProvider
        ReactRouterRoute={Route}
        stringifyOptions={queryStringifyOptions}
      >
        <UserProvider>
          <AppProvider>
            <CartProvider>
              <Layout>
                <Helmet
                  titleTemplate={`%s - ${Config.clientName}`}
                  defaultTitle={`${Config.clientName}`}
                >
                  <html lang="de" />
                </Helmet>
                <Switch>
                  <Route exact path="/">
                    <Products />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route exact path="/logout">
                    <Logout />
                  </Route>
                  <Route exact path="/password/reset/:uid/:token">
                    <PasswordSet />
                  </Route>
                  <Route exact path="/password/reset">
                    <PasswordReset />
                  </Route>
                  <Route exact path="/registration/:uid/:token">
                    <RegistrationConfirmPage />
                  </Route>
                  <Route exact path="/registration">
                    <RegistrationFormPage />
                  </Route>
                  <Route exact path="/registration/success">
                    <RegistrationSuccessPage />
                  </Route>
                  <Route exact path="/products/:id">
                    <ProductDetail />
                  </Route>
                  <Route exact path="/products">
                    <Products />
                  </Route>
                  <Route exact path="/seller/logistic/routes/:id/edit">
                    <EditRoutePage />
                  </Route>
                  <Route exact path="/seller/logistic/routes/add">
                    <AddRoutePage />
                  </Route>
                  <Route exact path="/seller/logistic/jobs">
                    <JobsPage />
                  </Route>
                  <Route exact path="/seller/logistic/routes/:id">
                    <RouteDetailsPage />
                  </Route>
                  <Route exact path="/seller/logistic/routes">
                    <RoutesListPage />
                  </Route>
                  <Route exact path="/seller/products/:id/edit">
                    <ProductEditPage />
                  </Route>
                  <Route exact path="/sellers/:id">
                    <Seller />
                  </Route>
                  <Route exact path="/seller/products">
                    <SellerProductsListPage />
                  </Route>
                  <Route exact path="/seller/products/add">
                    <ProductAddPage />
                  </Route>
                  <Route exact path="/seller/products/:id">
                    <SellerProductDetailsPage />
                  </Route>
                  <Route exact path="/checkout/summary">
                    <CheckoutSummaryPage />
                  </Route>
                  <Route exact path="/checkout">
                    <Checkout />
                  </Route>
                  <Route exact path="/profile">
                    <ProfilePage />
                  </Route>
                  <Route exact path="/profile/company/deliveryAddress">
                    <DeliveryAddress />
                  </Route>
                  <Route exact path="/profile/company">
                    <CompanyProfile />
                  </Route>
                  <Route exact path="/profile/personal">
                    <PersonalProfile />
                  </Route>
                  <Route exact path="/profile/documents">
                    <CompanyDocuments />
                  </Route>
                  <Route exact path="/profile/password">
                    <PasswordChangePage />
                  </Route>
                  <Route exact path="/terms-of-services">
                    <TermsOfServicePage />
                  </Route>
                  <Route exact path="/contact">
                    <ContactPage />
                  </Route>
                  <Route exact path="/imprint">
                    <ImprintPage />
                  </Route>
                  <Route exact path="/prices">
                    <PricesPage />
                  </Route>
                  <Route exact path="/privacy-policy">
                    <PrivacyPolicyPage />
                  </Route>
                  <Route exact path="/history/orders/:id">
                    <OrderPage />
                  </Route>
                  <Route exact path="/history/orders">
                    <OrdersPage />
                  </Route>
                  <Route exact path="/history/deliveries">
                    <DeliveriesPage />
                  </Route>
                </Switch>
              </Layout>
            </CartProvider>
          </AppProvider>
        </UserProvider>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
