import { useState } from "react";

const ADULT_PRICE = 299;
const CHILD_PRICE = 89;
const REFILL_PRICE = 29;
const WATER_PRICE = 10;
const SODA_PRICE = 25;

const styles = `

{ box-sizing: border-box; }
body {
margin: 0;
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
background-color: #d1d5db;
color: #1f2937;
}
.page-wrapper {
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
padding: 20px 12px;
}
.card {
width: 100%;
max-width: 480px;
background-color: #f9fafb;
border: 1px solid #e5e7eb;
border-radius: 6px;
padding: 28px 24px;
box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}
.title { margin: 0; text-align: center; font-size: 1.55rem; font-weight: 700; color: #111827; }
.subtitle { margin: 6px 0 18px; text-align: center; font-size: 0.92rem; color: #4b5563; }
.form-group { margin-bottom: 14px; display: flex; flex-direction: column; gap: 5px; }
.label-text { font-size: 0.85rem; color: #374151; }
.input-control, .select-control {
width: 100%;
height: 38px;
padding: 6px 10px;
border: 1px solid #9ca3af;
border-radius: 4px;
background-color: #ffffff;
font-size: 0.95rem;
color: #111827;
}
.input-control:disabled { background-color: #d1d5db; cursor: not-allowed; }
.drink-section { margin-top: 4px; margin-bottom: 14px; }
.drink-heading { display: block; font-size: 0.85rem; color: #4b5563; margin-bottom: 8px; }
.radio-option { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 0.9rem; cursor: pointer; }
.radio-option input[type="radio"] { accent-color: #2563eb; width: 15px; height: 15px; margin: 0; }
.discount-note { margin-top: 4px; font-size: 0.78rem; color: #6b7280; }
.error-text { margin-bottom: 12px; padding: 8px 10px; border-radius: 4px; background-color: #fee2e2; color: #b91c1c; font-size: 0.85rem; }
.button-group { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 16px; }
.btn { height: 40px; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 600; color: #ffffff; cursor: pointer; }
.btn-calculate { background-color: #3730a3; }
.btn-reset { background-color: #dc2626; }
.result-box { margin-top: 16px; padding: 14px 12px; border-radius: 4px; background-color: #e5e7eb; text-align: center; font-size: 0.95rem; color: #374151; }
.result-box strong { color: #111827; font-weight: 700; }
`;
export default function App() {
const [adultCount, setAdultCount] = useState("");
const [childCount, setChildCount] = useState("");
const [drinkType, setDrinkType] = useState("refill");
const [waterCount, setWaterCount] = useState("");
const [sodaCount, setSodaCount] = useState("");
const [discountRate, setDiscountRate] = useState(0);
const [totalAmount, setTotalAmount] = useState(0);
const [errorMsg, setErrorMsg] = useState("");

const handleDrinkChange = (type) => {
setDrinkType(type);
if (type === "refill") {
setWaterCount("");
setSodaCount("");
}
};

const handleCalculate = (e) => {
e.preventDefault();
setErrorMsg("");

if (adultCount === "" || childCount === "") {  
  setErrorMsg("กรุณาป้อนจำนวนผู้ใหญ่และจำนวนเด็กตั้งแต่ 0 ขึ้นไป");  
  return;  
}  

const adults = Number(adultCount);  
const children = Number(childCount);  
const water = drinkType === "bottle" ? Number(waterCount || 0) : 0;  
const soda = drinkType === "bottle" ? Number(sodaCount || 0) : 0;  

if (  
  Number.isNaN(adults) ||  
  Number.isNaN(children) ||  
  adults < 0 ||  
  children < 0 ||  
  water < 0 ||  
  soda < 0  
) {  
  setErrorMsg("กรุณากรอกตัวเลขตั้งแต่ 0 ขึ้นไป");  
  return;  
}  

if (adults === 0 && children === 0) {  
  setErrorMsg("กรุณาป้อนจำนวนผู้ใหญ่หรือจำนวนเด็กอย่างน้อย 1 คน");  
  return;  
}  

const foodTotal = adults * ADULT_PRICE + children * CHILD_PRICE;  
const discountedFood = foodTotal * (1 - Number(discountRate));  
const drinkTotal =  
  drinkType === "refill"  
    ? (adults + children) * REFILL_PRICE  
    : water * WATER_PRICE + soda * SODA_PRICE;  

setTotalAmount(discountedFood + drinkTotal);  
};

const handleReset = () => {
setAdultCount("");
setChildCount("");
setDrinkType("refill");
setWaterCount("");
setSodaCount("");
setDiscountRate(0);
setTotalAmount(0);
setErrorMsg("");
};

return (
<div className="page-wrapper">
<style>{styles}</style>
<form className="card" onSubmit={handleCalculate}>
<h1 className="title">Buffet Calculator</h1>
<p className="subtitle">คำนวณค่าอาหารบุฟเฟต์</p>

    <div className="form-group">  
      <label htmlFor="adultCount" className="label-text">จำนวนผู้ใหญ่ (คนละ 299 บาท)</label>  
      <input id="adultCount" type="number" min="0" className="input-control" value={adultCount} onChange={(e) => setAdultCount(e.target.value)} />  
    </div>  

    <div className="form-group">  
      <label htmlFor="childCount" className="label-text">จำนวนเด็ก (คนละ 89 บาท)</label>  
      <input id="childCount" type="number" min="0" className="input-control" value={childCount} onChange={(e) => setChildCount(e.target.value)} />  
    </div>  

    <div className="drink-section">  
      <span className="drink-heading">เครื่องดื่ม</span>  
      <label className="radio-option">  
        <input type="radio" name="drinkType" value="refill" checked={drinkType === "refill"} onChange={() => handleDrinkChange("refill")} />  
        <span>น้ำรีฟิล คนละ 29 บาท (ผู้ใหญ่และเด็ก)</span>  
      </label>  
      <label className="radio-option">  
        <input type="radio" name="drinkType" value="bottle" checked={drinkType === "bottle"} onChange={() => handleDrinkChange("bottle")} />  
        <span>เครื่องดื่มแบบขวด</span>  
      </label>  
    </div>  

    <div className="form-group">  
      <label htmlFor="waterCount" className="label-text">น้ำเปล่า (ขวดละ 10 บาท)</label>  
      <input id="waterCount" type="number" min="0" disabled={drinkType === "refill"} className="input-control" value={waterCount} onChange={(e) => setWaterCount(e.target.value)} />  
    </div>  

    <div className="form-group">  
      <label htmlFor="sodaCount" className="label-text">น้ำอัดลม (ขวดละ 25 บาท)</label>  
      <input id="sodaCount" type="number" min="0" disabled={drinkType === "refill"} className="input-control" value={sodaCount} onChange={(e) => setSodaCount(e.target.value)} />  
    </div>  

    <div className="form-group">  
      <label htmlFor="discount" className="label-text">บัตรส่วนลด</label>  
      <select id="discount" className="select-control" value={discountRate} onChange={(e) => setDiscountRate(Number(e.target.value))}>  
        <option value={0}>ไม่มีส่วนลด</option>  
        <option value={0.1}>ส่วนลด 10%</option>  
        <option value={0.15}>ส่วนลด 15%</option>  
        <option value={0.2}>ส่วนลด 20%</option>  
      </select>  
      <span className="discount-note">ลดเฉพาะค่าอาหารทั้งหมด ไม่รวมเครื่องดื่ม</span>  
    </div>  

    {errorMsg && <div className="error-text">{errorMsg}</div>}  

    <div className="button-group">  
      <button type="submit" className="btn btn-calculate">คำนวณ</button>  
      <button type="button" className="btn btn-reset" onClick={handleReset}>รีเซ็ต</button>  
    </div>  

    <div className="result-box">  
      ยอดชำระทั้งหมด{" "}  
      <strong>  
        {totalAmount.toLocaleString("en-US", {  
          minimumFractionDigits: 2,  
          maximumFractionDigits: 2,  
        })}{" "}  
        บาท  
      </strong>  
    </div>  
  </form>  
</div>  
);
}  