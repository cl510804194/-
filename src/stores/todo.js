export default {
  dataSource: [],
  data: {},
  add(arr, gid) {
    const newData = {};
    newData.gid = gid;
    newData.data = arr;
    const find = this.dataSource.findIndex(item => item.gid == gid);
    if (find == -1) {
      this.dataSource.push(newData);
    } else {
      this.dataSource.splice(find, 1, newData);
    }
  },
  del(gid) {
    debugger;
    const newDataSource = this.dataSource.filter(item => {
      return item.gid != gid;
    });
    this.dataSource = newDataSource;
  },
};
