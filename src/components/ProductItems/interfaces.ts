export interface AddItemDialogProps {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  register: any;
  errors: any;
  setValue: Function;
  clearError: Function;
  handleSubmit: Function;
}
