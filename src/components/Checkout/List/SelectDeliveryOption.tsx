import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, { useEffect } from "react";
import { getCurrencySymbol } from "../../../core/constants/currencies";
import { deliveryOptionsMapping } from "./deliveryMapping";
import { CheckoutItemType } from "../../../core/types/checkout";
import { CheckoutDeliveryOptionsItem } from "../../../core/types/checkoutDeliveryOptions";

interface SelectDeliveryOptionProps {
  index: number;
  item: CheckoutDeliveryOptionsItem;
  handleChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>,
    index: number,
    productId: number
  ) => void;
}

const SelectDeliveryOption = (props: SelectDeliveryOptionProps) => {
  const { index, item, handleChange } = props;
  const [deliveryOption, setDeliveryOption] = React.useState<number>(
    item.deliveryOption.id
  );

  useEffect(() => {
    setDeliveryOption(item.deliveryOption.id);
  }, [item.deliveryOption.id]);

  return (
    <FormControl variant="outlined" fullWidth>
      <Select
        value={deliveryOption}
        onChange={(event) => {
          handleChange(event, index, item.product.id);
        }}
      >
        {item.deliveryOptions.map((deliveryOption: any) => (
          <MenuItem value={deliveryOption.id} key={deliveryOption.id}>
            {deliveryOptionsMapping[deliveryOption.id]}{" "}
            {deliveryOption.value.toFixed(2)}
            {getCurrencySymbol()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDeliveryOption;
