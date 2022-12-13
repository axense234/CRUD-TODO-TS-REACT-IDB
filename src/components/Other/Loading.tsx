// React Spinners
import { ClockLoader } from "react-spinners";
// CSS
import "../../styles/Other/Loading.css";

const Loading: React.FC = () => {
  return (
    <section className='loading-container'>
      <h2>Loading...</h2>
      <ClockLoader speedMultiplier={10} color='#14397d' size={200} />
    </section>
  );
};

export default Loading;
