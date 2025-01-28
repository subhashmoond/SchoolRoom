import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { MemberComponent } from './member/member.component';
import { CommunityService } from '../../../core/services/community.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddMemberComponent } from "./add-member/add-member.component";
import { InputTextModule } from 'primeng/inputtext';
import { CommunityWebsocketService } from '../../../core/services/community-websocket.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, AvatarModule, SidebarModule, FileUploadModule, MemberComponent, ToastModule, DialogModule, AddGroupComponent, AddMemberComponent, FormsModule, InputTextModule, ImageModule],
  providers: [MessageService],

  templateUrl: './group.component.html',
  styleUrl: './group.component.css',
})
export class GroupComponent {
  @Input() groupData: any;
  @Input() communityId: any;

  isToggle: boolean = false;
  isMember: boolean = false;
  isEditGroup: boolean = false;
  isAddMember: boolean = false;
  isEditMessage: boolean = false;
  editGroupData: any;
  groupDatas: any;
  messageValue: any;
  messagesList: any;
  selectFiles: any
  hoveredIndex: number | null = null;
  editMessageValue: any;
  editMessageData: any

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private _communityService: CommunityService, private _messageService: MessageService, private _communityWebService: CommunityWebsocketService) { }

  ngOnInit() {
    this.getGroupData();
    this.getMessages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['groupData']) {
      console.log('Parent Data changed:', changes['groupData'].currentValue);
      this.handleParentChange(changes['groupData'].currentValue);
    }
  }

  handleParentChange(newData: string) {
    this.getMessages();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const container = this.chatContainer?.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  getGroupData() {
    this._communityService.getGroupById(this.groupData.id).subscribe(res => {
      this.groupDatas = res
    })
  }

  toggleDropdown() {
    this.isToggle = !this.isToggle
  }

  memberSideBar() {
    this.isMember = true
  }

  deleteGroup(id: any) {
    this._communityService.deleteGroup(id).subscribe((res: any) => {
      if (res.status === true) {
        this._messageService.add({ severity: 'success', detail: res.message });
      }
    })
  }

  editGroup(data: any) {
    this.isEditGroup = true;
    this.editGroupData = data
  }

  addMemberSideBar(id: number) {
    this.isAddMember = true
  }

  closePopup(event: any) {
    this.getGroupData();
    this.isEditGroup = false;
    this._messageService.add({ severity: 'success', detail: 'Group updated successfully.' });
  }

  closeMemberPopup(event: any) {
    this.isAddMember = false
    this._messageService.add({ severity: 'success', detail: event });
  }




  getMessages() {

    // Subscribe to WebSocket messages
    this._communityWebService.getMessages().subscribe({
      next: (message) => {
        // console.log('Received message:', message);
        // Handle the server's response for all messages
        if (message.action === 'all_messages') {
          this.messagesList = message.messages;
          console.log(this.messagesList, "get all messages list data")
        }
      },
      error: (err) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed'),
    });



    // Request all messages
    this._communityWebService.getAllMessages();

  }

  sendMessage(): void {
    if (this.messageValue.trim()) {
      this._communityWebService.sendNewMessage(this.messageValue);
      console.log('Message sent:', this.messageValue);
      this.messageValue = ''; // Clear the input field after sending
    } else {
      console.warn('Cannot send an empty message.');
    }

    this.getMessages();
  }

  deleteMesage(messageId: any) {
    this._communityWebService.deleteMessage(messageId);
    this.messageValue = '';

    this.getMessages();
  }

  editMessage(messageData: any) {
    this.isEditMessage = true;
    this.editMessageValue = messageData.message;
    this.editMessageData = messageData
  }

  saveEditMessage() {
    this._communityWebService.editMessage(this.editMessageData.id, this.editMessageValue);
    this.editMessageData = '';
    this.editMessageValue = '';
    this.getMessages();
    this.isEditMessage = false
  }

  onFileSelect(event: any) {

    const file = event.files[0];
    this.selectFiles = file;

    const payload = new FormData();

    payload.append('attach_file', this.selectFiles)

    this._communityService.fileUploadInGroup(this.groupData.id, payload).subscribe(res => {

    })

    this.getMessages();

  }

  fileRemove() {
    this.selectFiles = null;
  }


}
