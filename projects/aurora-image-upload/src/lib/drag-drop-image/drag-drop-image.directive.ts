import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[libDragDropImage]'
})
export class DragDropImageDirective {

  /**
   *
   */
  @Output() fileDropped = new EventEmitter<FileList>();

  /**
   *
   * @private
   */
  // @HostBinding('style.background') private background = '#f5fcff';

  /**
   *
   * @private
   */
  @HostBinding('style.opacity') private opacity = '1';

  constructor() { }

  /**
   * Dragover listener
   * @param evt
   */
  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    // this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  /**
   * Dragleave listener
   * @param evt
   */
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.opacity = '1';
  }

  /**
   * Drop listener
   * @param evt
   */
  @HostListener('drop', ['$event']) public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
    this.opacity = '1';
  }

}
