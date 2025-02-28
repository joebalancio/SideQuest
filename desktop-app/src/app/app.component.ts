import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { LoadingSpinnerService } from './loading-spinner.service';
import { StatusBarService } from './status-bar.service';
import { WebviewService } from './webview.service';
import { DragAndDropService } from './drag-and-drop.service';
import { ElectronService } from './electron.service';
import { BsaberService } from './bsaber.service';
import { AdbClientService } from './adb-client.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    @ViewChild('spinner', { static: false }) spinner;
    @ViewChild('status', { static: false }) status;
    @ViewChild('webview', { static: false }) webview;
    constructor(
        private spinnerService: LoadingSpinnerService,
        private statusService: StatusBarService,
        private adbService: AdbClientService,
        private appService: AppService,
        public webService: WebviewService,
        public dragService: DragAndDropService,
        electronService: ElectronService,
        private bsaberSerivce: BsaberService
    ) {}
    ngOnInit() {
        this.bsaberSerivce
            .downloadQSP()
            .then(() => <Promise<void>>this.bsaberSerivce.downloadConverterBinary())
            .then(() => this.adbService.setupAdb())
            .then(() => this.adbService.connectedStatus())
            .then(() => this.bsaberSerivce.getMySongs())
            .then(() => (this.bsaberSerivce.jSon = this.bsaberSerivce.getAppJson()));
    }
    ngAfterViewInit() {
        this.spinnerService.setSpinner(this.spinner);
        this.statusService.setStatus(this.status);
        console.log(this.webview);
        this.webService.setWebView(this.webview.nativeElement);
    }
}
