declare module 'sweetalert' {
  function swal (
    title: string,
    options?: SweetAlertOptions
  ): Promise<SweetAlertResult>;

  type SweetAlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

  interface SweetAlertOptions {
    title?: string
    text?: string
    type?: SweetAlertType
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    icon?: SweetAlertType
    buttons?: string[]
  }

  interface SweetAlertResult {
    value: any
    dismiss: SweetAlertDismissReason
  }

  type SweetAlertDismissReason = 'cancel' | 'overlay' | 'close';

  export = swal;
}
