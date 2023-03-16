
import { useState } from 'react';
import DatePicker from 'react-datepicker';
interface Props {

}

function Datepicker(props: Props) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
        <DatePicker id='datepicker' selected={startDate} onChange={(date: Date) => setStartDate(date)} />
    
    </>
  );
}

export default Datepicker;