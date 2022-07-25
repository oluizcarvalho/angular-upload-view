import { Component } from '@angular/core';
import { FileUploadService } from './file-upload.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  shortLink: string = ''; // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file to Upload
  img: any = '';
  constructor(private fileUploadService: FileUploadService) {}

  async onChange(event) {
    this.file = event.target.files[0];
    this.img = await this.blobToBase64(this.file);
  }

  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  onUpload() {
    if (this.file) {
      this.loading = !this.loading;
      this.fileUploadService.upload(this.file).subscribe((event: any) => {
        if (typeof event === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      });
    }
  }
}
