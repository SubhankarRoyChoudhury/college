import {
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-dialog-common-header',
  templateUrl: './dialog-common-header.component.html',
  styleUrls: ['./dialog-common-header.component.scss'],
})
export class DialogCommonHeaderComponent implements OnInit {
  tooltipMsg: boolean = false;
  @Input() search_required: boolean = false;
  @Input() print_required: boolean = false;
  @Input() title: any = '';
  @Input() subtitle: any = '';
  @Input() commonTooltipMsg: any = '';
  @Output() getSearchClickEvent = new EventEmitter();
  @Output() getPrintClickEvent = new EventEmitter();

  constructor(
    public apiSharedService: SharedService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogCommonHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.subtitle);
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      const openDialogs = this.dialog.openDialogs;
      if (openDialogs.length > 0) {
        const mostRecentDialog = openDialogs[openDialogs.length - 1];
        mostRecentDialog.close();
      }
    }
  }

  generateClickEvent(): void {
    this.getSearchClickEvent.emit();
  }
  generatePrintClickEvent(): void {
    this.getPrintClickEvent.emit();
  }
}
