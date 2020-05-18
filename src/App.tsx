import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ExtendedStringifyOptions,
  QueryParamProvider,
  transformSearchStringJsonSafe,
} from "use-query-params";
import Layout from "./components/Layout";
import { Provider as AppProvider } from "./core/context";
import Checkout from "./pages/Checkout";
import CheckoutSummaryPage from "./pages/CheckoutSummary";
import DeliveryAddress from "./pages/DeliveryAddress";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PasswordChangePage from "./pages/PasswordChange";
import PasswordReset from "./pages/PasswordReset";
import PasswordSet from "./pages/PasswordSet";
import ProductAddPage from "./pages/ProductAdd";
import ProductDetail from "./pages/ProductDetail";
import ProductEditPage from "./pages/ProductEdit";
import Products from "./pages/Products";
import ProfilePage from "./pages/Profile";
import CompanyProfile from "./pages/Profile/Company";
import CompanyDocuments from "./pages/Profile/Documents";
import PersonalProfile from "./pages/Profile/Personal";
import Registration from "./pages/Registration";
import RegistrationConfirmPage from "./pages/RegistrationConfirm";
import AddRoutePage from "./pages/Routes/Add";
import RoutesListPage from "./pages/Routes/List";
import Seller from "./pages/Seller/Seller.component";
import SellerProductDetailsPage from "./pages/SellerProductDetail";
import SellerProductsListPage from "./pages/SellerProducts";

const queryStringifyOptions: ExtendedStringifyOptions = {
  transformSearchString: transformSearchStringJsonSafe,
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider
        ReactRouterRoute={Route}
        stringifyOptions={queryStringifyOptions}
      >
        <AppProvider>
          <Layout>
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
                <Registration />
              </Route>
              <Route exact path="/products/:id">
                <ProductDetail />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/seller/logistic/routes/add">
                <AddRoutePage />
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
            </Switch>
          </Layout>
        </AppProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
