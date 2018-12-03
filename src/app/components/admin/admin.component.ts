import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PnotifyService } from '../../services/pnotify.service';
import { AuthService } from '../../services/auth.service';
declare var $:any;
var self : any;
var tbl : any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public lists: any = [];
  pnotify = undefined;
  public role: any = [];

  constructor(
    private router: Router,
    private adminLists:AuthService, 
    public pnotifyService: PnotifyService
  ) { 
    this.pnotify = pnotifyService.getPNotify();
  }

    //tro ve trang chu
    backhome()
    {
      this.router.navigate(['/home']);  
    }
    //dang xuat
    logout()
    {
      this.router.navigateByUrl('/login');
    }

  public getAllAdmin() {
    this.role = sessionStorage.getItem('role');
    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.adminLists.getAllAdmin(token).then((data) => {
        if(data.json().errorCode==0)
        {
          this.lists = data.json().data;
          tbl.clear().draw();
          tbl.rows.add(this.lists); // Add new data
          tbl.columns.adjust().draw(); // Redraw the DataTable
        }
        else if(data.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }

  public onSubmit() {
    const Detail = {
      'username': $('#username').val(),
      'active': $('#active').val(),
      'role':  $('#role').val(),
      'password': "123"
    }

    const token = localStorage.getItem('token');
    if(token == '' || token == null)
    {
      this.logout();
    }else{
    if (token) {
      this.adminLists.addAdmin(token, Detail).then((data) => {
        if(data.json().errorCode==0)
        {
          this.getAllAdmin();
          this.pnotify.success({
            text: "Thêm Thành Công !",
            delay:2000   
          });
        }
        else if(data.json().status === 'fail')
        {
          this.logout();
          this.pnotify.error({
            text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
            delay:2000   
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }

  ngOnInit() {
    self=this;
    // $('#department').select2();
    $('.btn_add').click(function(){
      $('#admin').modal("show");
      var Id = $('#hideId').val();
      if(Id==0)
      {
        $('.modal-title').text("Thêm Admin");
        $('#username').val("");
        $('#active').val("");
        $('#role').val("");
      }
    }) 

    //add vao datatable
    tbl = $("#dataTable").DataTable({
      columnDefs: [
          { orderable: false, targets: [4] }
      ],
      aLengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "All"]
      ],
      language: {
        "sProcessing":   "Đang xử lý...",
        "sLengthMenu":   "Xem _MENU_ mục",
        "sZeroRecords":  "Không tìm thấy dòng nào phù hợp",
        "sInfo":         "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
        "sInfoEmpty":    "Đang xem 0 đến 0 trong tổng số 0 mục",
        "sInfoFiltered": "(được lọc từ _MAX_ mục)",
        "sInfoPostFix":  "",
        "sSearch":       "Tìm:",
        "sUrl":          "",
        "oPaginate": {
            "sFirst":    "Đầu",
            "sPrevious": "Trước",
            "sNext":     "Tiếp",
            "sLast":     "Cuối"
        }
      },
      iDisplayLength: 10,
      order: [[1, "asc"]],
      rowId: "uid",
      columns: [
        { data: null},
        { data: "username" },  
        { data: "role",render:function(data){
          if(data == 0)
          {
            return 'Super Admin'
          }
          else
          {
            return 'Admin'
          }
        }},           
        {data: "active",render:function(data){
          if(data == 0)
          {
            return 'Đang hoạt động'
          }
          else
          {
            return 'Nghỉ'
          }
        }},
        { data: "role",  render: function ( data, type, row ) {
          if (self.role == 0) {
            if (data != 0) {
              return '<i data-group="grpDelete" class="fa fa-remove text-danger m-1 pointer"></i>';
            } else {
              return null;
            }
          } else {
            return null;
          }     
        }}
      ],
      initComplete: function (settings, json) {
        self.getAllAdmin();
        //$("select[name=tbl_length]").select2({ width: '80px', minimumResultsForSearch: -1 });
      },
      drawCallback: function( settings ) {
        self.bindTableEvents();
      }
    });

    tbl.on('order.dt search.dt', function () {
      tbl.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
          cell.innerHTML = i + 1;
      });
    }).draw(); 
  }

  bindTableEvents()
  {
  $('#dataTable_wrapper').removeClass("container-fluid");
  $('i[data-group=grpDelete]').off('click').click(function(){
    const token = localStorage.getItem('token');
    self.rowId=$(this).closest('tr').attr('id');
    $.confirm({
      title:"Thông báo !",
      content: 'Bạn có chắc muốn xóa ?',
      buttons: {
          info: {
            text: 'Xóa',
            btnClass: 'btn-red',
              action: function(){
                self.adminLists.updateAdmin(token, self.rowId).then(data=>{
                    if(data.json().errorCode==0 && data.json().status === 'successfully')
                    {
                      self.pnotify.success({
                        text: "Xóa Thành Công",
                        delay:2000   
                      });
                      self.getAllAdmin();
                    }
                    else if (data.json().errorCode==3 && data.json().status === 'Role Error')
                    {
                      self.pnotify.error({
                        text: "Không thể xóa vì cấp bậc của bạn không cho phép !",
                        delay:2000   
                      });
                    } else if (data.json().errorCode==404 && data.json().status === 'Missing') {
                      self.pnotify.error({
                        text: "Không thể cập nhật !",
                        delay:2000   
                      });
                    } else {
                      self.logout();
                      self.pnotify.error({
                        text: "Phiên làm việc hết hạn.Vui lòng đăng nhập lại",
                        delay:2000   
                      });
                    }
                });
            }
          },
          danger: {
            text: 'Hủy',
            btnClass: 'btn-default', // multiple classes.
            action:function(){
            }
          }
      }
    });
  });
}

}
