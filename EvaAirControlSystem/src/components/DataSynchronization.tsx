import Button from "./common/Button";

function DataSynchronization() {
  return (
    <div className="text-white flex gap-5  flex-col bg-[#202020] p-5 rounded-md">
      <p>請按下同步按鈕開始進行同步</p>
      <p>資料同步中</p>
      <p>同步成功結束!</p>
      <div className="text-center">
        <Button size="md" color="bg-PowerOn">
          開始同步
        </Button>
      </div>
    </div>
  );
}

export default DataSynchronization;
