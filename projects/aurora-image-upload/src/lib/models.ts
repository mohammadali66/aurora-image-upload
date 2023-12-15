/**
 * Message class for uploading image
 */
export class Message {
  public readonly SUCCESS_TYPE = 'success';
  public readonly ERROR_TYPE = 'error';

  public text: string = '';
  public type: string = '';

  /**
   * set success message when uploading image done successfully
   */
  set_success_message(): void {
    this.text = 'Your image has been successfully uploaded. ' +
      'Upon submitting the form, the information will be securely stored in our database for future reference.';
    this.type = this.SUCCESS_TYPE;
    this.set_empty_after_seconds();
  }

  /**
   * set error message for width or height more than max
   * @param max_height
   * @param max_width
   *
   */
  set_width_height_error_message(max_height: number, max_width: number): void {
    this.text = `You can only upload an image with a height of ${max_height} pixels and a width of ${max_width} pixels.`;
    this.type = this.ERROR_TYPE;
    this.set_empty_after_seconds();
  }

  /**
   * set error message for size more than max
   * @param max_size_h max size human-readable
   */
  set_size_error_message(max_size_h: string): void {
    this.text = `You can only upload an image with a maximum size of ${max_size_h}.`;
    this.type = this.ERROR_TYPE;
    this.set_empty_after_seconds();
  }

  /**
   * set error message for invalid image type
   * @param validImageTypes_h valid image types human-readable
   */
  set_type_error_message(validImageTypes_h: string): void {
    this.text = `You can only upload images in ${validImageTypes_h} formats.`;
    this.type = this.ERROR_TYPE;
    this.set_empty_after_seconds();
  }

  /**
   * set empty text message after 7000 ms
   * @private
   */
  private set_empty_after_seconds(): void {
    setTimeout(() => {
      this.text = '';
      this.type = '';
    }, 7000);
  }
}
