import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Message} from "./models";
import { faClose, faImage } from '@fortawesome/free-solid-svg-icons';

/**
 * Aurora image upload component is for uploading image with choose file or drag and drop
 * Example 1:
 * validImageTypes = ['image/jpeg', 'image/png'];
 * set_logo(event: any): void {
 *     debugger
 * }
 *
 * <aurora-image-upload
 *       [max_height]="1500"
 *       [max_width]="1500"
 *       [max_size]="1512000"
 *       [validImageTypes]="validImageTypes"
 *       (uploadedImageFile)="set_logo($event)">
 * </aurora-image-upload>
 * - When upload an image parent component can access to it with uploadedImageFile output
 * *********************************************************************************************************************
 *
 * Example 2:
 * initImageUrl = '/assets/images/ultrasound/image_188.png';
 *
 * <aurora-image-upload
 *       [max_height]="1500"
 *       [max_width]="1500"
 *       [max_size]="1512000"
 *       [validImageTypes]="validImageTypes"
 *       [initImageUrl]="initImageUrl"
 *       (uploadedImageFile)="set_logo($event)">
 * </aurora-image-upload>
 *
 * - You can set an initial image to the component.
 */
@Component({
  selector: 'aurora-image-upload',
  templateUrl: './aurora-image-upload.component.html',
  styleUrls: ['./aurora-image-upload.component.css']
})
export class AuroraImageUploadComponent implements OnInit, OnChanges{
  faImage = faImage;
  faClose = faClose;
  /**
   * file input tag in template
   */
  @ViewChild('fileInput') fileInput: ElementRef;

  /**
   * img tag in template
   */
  @ViewChild('imgPreview') imgPreview: ElementRef;

  /**
   * max height limitation of image
   * unit is px
   * default value is 1000px
   */
  @Input() max_height: number = 1000;

  /**
   * max width limitation of image
   * unit is px
   * default value is 1000px
   */
  @Input() max_width: number = 1000;

  /**
   * max size limitation of image
   * unit is byte
   * default value is 1000B
   */
  @Input() max_size: number = 1000;

  /**
   * valid image types in a list of strings
   * formats:
   *  - image/jpeg
   *  - image/png
   *  - image/gif
   *  - image/bmp
   *  example: ['image/jpeg', 'image/png']
   * default value is ['image/jpeg']
   */
  @Input() validImageTypes: Array<string> = ['image/jpeg'];

  /**
   * You can define an initial image url.
   * this image set on img tag
   */
  @Input() initImageUrl: string = '';

  /**
   * if an image upload, it returns file of image to parent
   * if remove the image, it returns null
   */
  @Output() uploadedImageFile = new EventEmitter<File | null>;

  /**
   * max size human-readable
   * We convert max_size to human-readable and sets to this property when call convert_max_size_to_human_readable()
   */
  max_size_h: string = '';

  /**
   *  validImageTypes human-readable
   *  for example if validImageTypes is ['image/jpeg', 'image/png'], this property is 'JPEG, PNG'
   */
  validImageTypes_h: string = '';

  /**
   * It set true, when upload an image
   */
  isUpload = false;

  /**
   * It set true, when hover on drag drop box
   */
  isHovering = false;

  /**
   * It set true, when hover on close icon
   */
  isCloseIconHovered = false;

  /**
   * this property manages messages of process.
   */
  message: Message = new Message();

  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    // debugger
    // throw new Error('Method not implemented.');
  }

  /**
   * it calls onFileInput() to checks if initImageUrl is available
   * it calls convert_max_size_to_human_readable() to convert max size to human-readable
   * it calls convert_validImageTypes_to_human_readable() to convert valid image types to human-readable
   */
  ngOnInit(): void {
    this.onFileInput();
    this.convert_max_size_to_human_readable();
    this.convert_validImageTypes_to_human_readable();
  }

  /**
   * This method is called, if upload a file from file chooser
   * @param event
   */
  onFileSelected(event: any) {
    const files = event.target.files;
    this.read_image_from_file(files);
  }

  /**
   * This method is called, if upload a file with drag and drop
   * @param files
   */
  onFileDropped(files: any) {
    this.read_image_from_file(files);
  }

  /**
   * This method is called, if upload a file with initImageUrl input
   */
  onFileInput() {
    if(this.initImageUrl == '') {
      return;
    }
    this.getImageAsFile(this.initImageUrl).subscribe(file => {
      let files = [file];
      this.read_image_from_file(files);
    });
  }

  /**
   * This method convert image url to file
   * It just use when upload an image with initImageUrl input
   * @param url
   */
  getImageAsFile(url: string): Observable<File> {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        map(blob => {
          var file = new File([blob], 'filename', { type: blob.type });
          return file;
        })
      );
  }

  /**
   * This method reads file and checks validations
   * @param files
   */
  read_image_from_file(files: any) {
    const file = files[0];
    if (!file) {
      return;
    }

    this.isUpload = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {

      if(!this.is_valid_type(file)) {
        return;
      }

      if(!this.is_valid_size(file)) {
        return;
      }
      const image = new Image();
      image.src = e.target.result;
      this.check_width_height(image, file);
    };
    reader.readAsDataURL(file);
  }

  /**
   * This method checks if width and height are valid.
   * if everything is valid, set uploadImageFile
   * @param image
   * @param file
   */
  check_width_height(image: any, file: File): void {
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      if (width > this.max_width || height > this.max_height) {
        this.removeImage();
        this.message.set_width_height_error_message(this.max_height, this.max_width);
      } else {
        this.set_uploadedImageFile(image, file);
      }
    };
  }

  /**
   * This method checks type of image
   * if everything is correct return true
   * @param file
   */
  is_valid_type(file: any): boolean {
    let fileType = file.type;
    if (!this.validImageTypes.includes(fileType)) {
      this.removeImage();
      this.message.set_type_error_message(this.validImageTypes_h);
      return false;
    }
    return true;
  }

  /**
   * This method checks size of the image
   * if everything is correct return true
   */
  is_valid_size(file: any): boolean {
    let fileSize = file?.size;
    if (fileSize > this.max_size) {
      this.removeImage();
      this.message.set_size_error_message(this.max_size_h);
      return false;
    }
    return true;
  }

  /**
   * This method converts max size to human-readable and sets it to max_size_h
   */
  convert_max_size_to_human_readable(): void {
    let unit = 'B';
    const myConst = 1024;
    let max_size_h = this.max_size;

    if (this.max_size > myConst) {
      max_size_h /= myConst;
      unit = 'KB';
    }

    if (max_size_h > myConst) {
      max_size_h /= myConst;
      unit = 'MB';
    }

    if (max_size_h > myConst) {
      max_size_h /= myConst;
      unit = 'GB';
    }
    this.max_size_h = `${max_size_h}${unit}`;
  }

  /**
   * This method converts validImageTypes to human-readable and sets it to validImageTypes_h
   * for example if validImageTypes is ['image/jpeg', 'image/png'], this property is 'JPEG, PNG'
   */
  convert_validImageTypes_to_human_readable(): void {
    this.validImageTypes_h = this.validImageTypes.map(
      mimeType => mimeType.split('/')[1].toUpperCase()).join(', ');
  }

  /**
   * This method returns uploaded image file and displays success message
   */
  set_uploadedImageFile(image: any, file: File): void {
    const imgPreviewElement = this.imgPreview.nativeElement as HTMLImageElement;
    imgPreviewElement.src = image.src;
    this.uploadedImageFile.emit(file);
    this.message.set_success_message();
  }

  /**
   * This method is called when clicking on drag drop box
   * it is called from template
   */
  onFileInputClick() {
    this.fileInput.nativeElement.click();
  }

  /**
   * This method is called when clicking on close icon
   * and calls removeImage() for removing the image
   * @param event
   */
  onClickCloseIcon(event: Event): void {
    event.stopPropagation();    // do not open choose file dialog
    this.removeImage();
  }

  /**
   * This method removes image and returns null to parent
   */
  removeImage() {
    const img = this.imgPreview.nativeElement as HTMLImageElement;
    img.src = '';
    this.isUpload = false;
    this.isCloseIconHovered = false;
    this.uploadedImageFile.emit(null);
  }

  /**
   * This method changes text in middle of box when hovering over close icon
   * @param value
   */
  setCloseIconHovered(value: boolean) {
    this.isCloseIconHovered = value;
  }
}
