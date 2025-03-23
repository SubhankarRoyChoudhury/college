import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../app.service';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  files: any[] = [];

  constructor(
    private fileUploadService: AppService,
    public dialogRef: MatDialogRef<FileUploaderComponent>
  ) {}

  ngOnInit(): void {
    // this.loadFiles();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (res) => {
          console.log('Upload successful', res);
          this.dialogRef.close(res.id); // ✅ Close dialog after successful upload
        },
        (error) => {
          console.error('Upload failed', error);
          alert('Upload failed! Please try again.');
        }
      );
    }
  }

  loadFiles() {
    this.fileUploadService.getFiles(1).subscribe((data) => {
      this.files = data;
    });
  }

  isImage(fileUrl: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileUrl);
  }

  isPDF(fileUrl: string): boolean {
    return /\.pdf$/i.test(fileUrl);
  }

  close() {
    this.dialogRef.close();
  }
}
