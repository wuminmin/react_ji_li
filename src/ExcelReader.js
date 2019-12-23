import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import AppGlobal from './AppGlobal';
import CommonMethod from './commonMethod';
 
class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res:'',
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };
 
  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {

        let self = this;
        CommonMethod.sendData({
            url: AppGlobal.url.java_url,
            code: 'testService',
            method: 'shang_chuang_excel',
            isLogin: false,
            message: {"tittle":self.props.tittle,"jlzs_excel":JSON.stringify(this.state.data, null, 2)},
            successFunc: function (response) {
              console.log(response);
              self.setState({
                res: response.res,
              })
            },
            errorFunc: function (e) {
              console.log(e);
            },
            encode: true
          });
        console.log(JSON.stringify(this.state.data, null, 2));
      });
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }
 
  render() {
    return (
      <div>
        <label htmlFor="file">上传excel表格</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input type='submit' 
          value="上传文件"
          onClick={this.handleFile} />
  <label htmlFor="file">{this.state.res}</label>
          </div>
    )
  }
}
 
export default ExcelReader;