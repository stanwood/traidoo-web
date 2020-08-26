import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { FormContext, useForm } from "react-hook-form";
import { Container } from "../../../../api/queries/containers";
import { Region } from "../../../../api/queries/regions";
import { Tag } from "../../../../api/queries/tags";
import { Category } from "../../../../core/interfaces/categories";
import { GlobalSettings } from "../../../../core/interfaces/settings";
import Product from "../../../../core/types/product";
import Availability from "./Sections/Availability";
import Delivery from "./Sections/Delivery";
import General from "./Sections/General";
import Image from "./Sections/Image";
import Internal from "./Sections/Internal";
import Pricing from "./Sections/Pricing";
import Properties from "./Sections/Properties";
import useStyles from "./styles";
import { ProductFormData } from "./types";
import {
  addProductSchemaValidator,
  editProductSchemaValidator,
} from "./validation";

interface ProductFormProps {
  onSubmit: (formData: ProductFormData) => void;
  categories: Category[];
  containers: Container[];
  regions: Region[];
  tags: Tag[];
  globalSettings?: GlobalSettings;
  product?: Product;
  buttonName: string;
}

const ProductForm: React.FC<ProductFormProps> = (props: ProductFormProps) => {
  const {
    onSubmit,
    categories,
    containers,
    regions,
    tags,
    globalSettings,
    buttonName,
    product,
  } = props;

  const defaultValues: ProductFormData = {
    name: product ? product.name : "",
    description: product ? product.description : "",
    image: undefined,
    price: product ? product.price : 0,
    unit: product ? product.unit : "kg",
    amount: product ? product.amount : 0,
    vat: product ? product.vat : globalSettings?.productVat[0],
    isOrganic: product ? product?.isOrganic : false,
    isGrazingAnimal: product ? product?.isGrazingAnimal : false,
    isVegan: product ? product?.isVegan : false,
    isGlutenFree: product ? product?.isGlutenFree : false,
    isGmoFree: product ? product?.isGmoFree : false,
    category: product ? product.category : categories[0],
    container: product ? product.containerType : containers[0],
    deliveryOptions: product ? product.deliveryOptions : [],
    thirdPartyDelivery: product ? product.thirdPartyDelivery : false,
    deliveryCharge: product ? product.deliveryCharge : 0,
    regions: product ? product.regions : [],
    ean8: product ? product.ean8 : "",
    ean13: product ? product.ean13 : "",
    sellersProductIdentifier: product ? product.sellersProductIdentifier : "",
    tags: product ? product.tags : [],
  };

  const form = useForm<ProductFormData>({
    validationSchema: product
      ? editProductSchemaValidator
      : addProductSchemaValidator,
    defaultValues,
  });

  const classes = useStyles();

  return (
    <FormContext {...form}>
      <form
        className={classes.form}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <General categories={categories} />

        <Grid container spacing={3} className={classes.imageContainer}>
          <Grid item xs={12} sm={6}>
            <Image productImage={product?.image} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Properties />
          </Grid>
        </Grid>

        <Pricing globalSettings={globalSettings} />

        <Delivery containers={containers} />

        <Availability regions={regions} />

        <Internal tags={tags} />

        <Grid container justify="flex-end" className={classes.actions}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.editButton}
            >
              {buttonName}
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormContext>
  );
};

export default ProductForm;
