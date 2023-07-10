<template>
  <div>
    <!--    <el-table-->
    <!--        :data="routeCableList"-->
    <!--        border-->
    <!--        style="width: 100%">-->
    <!--      <el-table-column-->

    <!--          prop="cable_seg_name"-->
    <!--          label="光缆段"-->
    <!--          width="250">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--          prop="station_a"-->
    <!--          label="A端站点"-->
    <!--          width="120">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--          prop="station_z"-->
    <!--          label="Z端站点"-->
    <!--          width="120">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--          prop="cable_name"-->
    <!--          label="光纤信息"-->
    <!--          width="200">-->
    <!--      </el-table-column>-->
    <!--      <el-table-column-->
    <!--          prop="is_main_backup"-->
    <!--          label="地址"-->
    <!--          width="300">-->
    <!--      </el-table-column>-->

    <!--      <el-table-column-->

    <!--          label="操作"-->
    <!--          width="100">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
    <!--          <el-button type="text" size="small">编辑</el-button>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--    </el-table>-->

    <el-form :inline="true" :model="searchForm">
      <el-form-item label="规划设计名称">
        <el-input v-model="searchForm.planDesignName" placeholder="规划设计名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="规划类型">
        <el-select v-model="searchForm.specId" placeholder="规划类型">
          <el-option v-once v-for="(item,index) in this.planDesignType.entries" :key="item.key" :value="item.value"
                     :label="item.text"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设计人">
        <el-input v-model="searchForm.designer" placeholder="设计人" clearable></el-input>
      </el-form-item>
      <el-form-item label="设计时间">
        <el-date-picker
            v-model="searchForm.createTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-button type="primary" icon="el-icon-search" @click="searchPlanDesignBill">查询</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>

    <el-table
        :data="planDesignInfoList"
        border
        style="width: 100%">
      <el-table-column
          prop="planBillNo"
          label="规划工单号"
          width="220">
      </el-table-column>
      <el-table-column
          prop="planDesignName"
          label="规划设计名称"
          width="220">
      </el-table-column>
      <el-table-column
          prop="designCompany"
          label="设计单位"
          width="230">
      </el-table-column>
      <el-table-column
          prop="specId"
          label="业务类型"
          width="120"
          :formatter="formatterDesignType">
      </el-table-column>
      <el-table-column
          prop="projectDirector"
          label="项目总负责人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="specLeader"
          label="专业负责人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="designer"
          label="设计人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="reviewer"
          label="校审人"
          width="120">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="设计新建时间"
          width="170">
      </el-table-column>
      <el-table-column
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @next-click="next"
        @prev-click="previous"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="this.searchForm.current"
        :page-sizes="[1,2,3,5,8]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
    </el-pagination>

    <el-dialog title="新增规划设计评估记录" :visible.sync="dialogFormVisible" width="85%">
      <el-form :model="form">
        <el-form-item label="规划工单编号" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.planBillNo" autocomplete="off" disabled :style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="规划设计名称" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.planDesignName" autocomplete="off" :style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="设计单位" :label-width="formLabelWidth">
          <el-input v-model="form.designCompany" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="规划类型" :label-width="formLabelWidth">
          <el-input v-model="form.specId" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" :label-width="formLabelWidth">
          <el-input v-model="form.projectDirector" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="专业负责人" :label-width="formLabelWidth">
          <el-input v-model="form.specLeader" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="设计人" :label-width="formLabelWidth">
          <el-input v-model="form.designer" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
        <el-form-item label="校审人" :label-width="formLabelWidth">
          <el-input v-model="form.reviewer" autocomplete="off":style="{width:'450px'}"></el-input>
        </el-form-item>
      </el-form>

      <div class="upload-wrapper">
        <template v-for="(label, index) in buttonLabels">
          <el-upload
              class="upload-item"
              :key="index"
              action="http://localhost:8080/upload"
              :limit="1"
              :on-exceed="exceedTips"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess(index)">
            <label>{{label}}</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="upload-description">{{ descriptions[index] }}</div>
          </el-upload>
        </template>
      </div>

      <div slot="footer" class="dialog-footer">
        <!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button type="primary" @click="saveAndAnalyse">保 存 分 析</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {planDesignType} from '@/enum.js'
export default {
  name: 'PlanDesign',
  data(){
    return{

      buttonLabels: ['系统规划CAD图纸：', '系统规划Excel文件：', '波道规划Excel文件'],
      descriptions: ['只能上传dwg文件，且不超过10MB，数量限制1个', '只能上传Excel文件，且不超过10MB，数量限制1个', '只能上传Excel文件，且不超过10MB，数量限制1个'], // 每个按钮的说明文字
      formLabelWidth: '120px',
      routeCableList: [],
      form: {
        planBillNo:'',
        planDesignName: '23-6-11-001设计规划',
        designCompany: '桂林电信',
        specId: '1',
        projectDirector: '张三',
        specLeader: '李四',
        designer: '王五',
        reviewer: '李华',
        systemCadFileName: '',
        systemCadFileUrl: '',
        systemExcelFileName: '',
        systemExcelFileUrl: '',
        channelExcelFileName: '',
        channelExcelFileUrl: '',
        source: '1',
      },
      searchForm: {
        planDesignName: "",
        specId: 1,
        designer: "",
        createTime: [],
        current: 1,
        size: 5
      },
      total: 0,
      planDesignType,
      planDesignInfoList: [],
      dialogFormVisible: false,
    }
  },
  methods:{
    selectRouteCable(){
      let _this=this;
      axios.get('http://localhost:8080/selectRouteCableList')
          .then(function (response) {
            // 处理成功情况
            console.log(response);
            _this.routeCableList=response.data.data;
          })
          .catch(function (error) {
            // 处理错误情况
            console.log(error);
          })
          .then(function () {
            // 总是会执行
          });
    },
    formatterDesignType(rows,column){
      console.log("业务类型：",rows.specId);
      if(rows.specId==1){
        return"OTW业务"
      }else if(rows.specId==2){
        return"网元业务"
      }
    },
    searchPlanDesignBill() {
      let _this=this;
      console.log(this.searchForm.createTime)
      console.log(this.searchForm.size)
      console.log(this.searchForm.current)

      axios.post('http://localhost:8080/searchBill', this.searchForm)
          .then(res => {
            console.log("res是服务器返回的结果", res);
            _this.planDesignInfoList=res.data.data.records;
            this.total=res.data.data.total;
          }, err => {
            console.log("服务器出错，err代表服务器返回的错误信息")
          });
    },
    previous(val){
      console.log("向前翻页",val);
      this.searchForm.current=val;
      this.searchPlanDesignBill();
    },
    next(val){
      console.log("向下翻页",val)
      this.searchForm.current=val;
      this.searchPlanDesignBill();
    },
    handleCurrentChange(val){
      console.log("当前页: ",val);
      this.searchForm.current=val;
      this.searchPlanDesignBill();
    },
    handleSizeChange(val){
      console.log("size",val)
      this.searchForm.size=val;
      this.searchPlanDesignBill();
    },
    add(){

      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
      var day = String(currentDate.getDate()).padStart(2, '0');
      var formattedDate = year + '-' + month + '-' + day;
      this.form.planBillName = formattedDate + "设计规划"

      let _this=this;
      axios.get('http://localhost:8080/getPlanBillNo')
          .then(function (response) {
            _this.form.planBillNo = response.data.data;
            _this.dialogFormVisible = true;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    save(){
      console.log("PlanDesign",this);
      let _this=this;
      axios.post('http://localhost:8080/createBill',this.form
      ).then(function (response) {
        console.log(response)
        console.log("response.data.message",response.data.message)
        if (response.data.code == 200){
          _this.dialogFormVisible=false;
          _this.$message({
            message: response.data.message,
            type: 'success'
          });
        } else {
          _this.$message.error(response.data.message);
        }
      })
          .catch(function (response) {
            _this.$message({
              message:"服务器异常"
            });
          })
    },

    saveAndAnalyse(){
      console.log("PlanDesign",this);
      let _this=this;
      axios.post('http://localhost:8080/createBillAndAnalyse',this.form
      ).then(function (response) {
        if (response.data.code == 200){
          _this.dialogFormVisible=false;
          _this.$message({
            message: response.data.message,
            type: 'success'
          });
        } else {
          _this.$message.error(response.data.message);
        }
      })
          .catch(function (response) {
            _this.$message({
              message:"服务器异常"
            });
          })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(index){
      return (response, file, fileList) => {
        console.log(`上传成功，按钮索引：${index}`);
        // 处理上传成功的逻辑，根据按钮索引执行不同的操作
        if (index === 0) {
          // 按钮1的成功处理逻辑
          this.form.systemCadFileName = file.name;
          console.log("文件1名称：" + this.form.systemCadFileName)
          this.form.systemCadFileUrl = response.data[0];
          console.log("文件1url：" + this.form.systemCadFileUrl)
        } else if (index === 1) {
          // 按钮2的成功处理逻辑
          this.form.systemExcelFileName = file.name;
          console.log("文件2名称：" + this.form.systemExcelFileName)
          this.form.systemExcelFileUrl = response.data[0];
          console.log("文件2url：" + this.form.systemExcelFileUrl)
        } else if (index === 2) {
          // 按钮3的成功处理逻辑
          this.form.channelExcelFileName = file.name;
          console.log("文件3名称：" + this.form.channelExcelFileName)
          this.form.channelExcelFileUrl = response.data[0];
          console.log("文件3url：" + this.form.channelExcelFileUrl)
        }
      }

    },
    exceedTips(){
      this.$message.error("只能上传一个文件");
    }
  },
  mounted(){
    console.log("vue组件实例",this);
    this.searchPlanDesignBill();
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item {
  display: inline-block !important;
}
.upload-wrapper {
  display: flex;
}

.upload-item {
  margin-right: 120px;
}

.upload-description {
  margin-top: 5px;
  color: #999;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
