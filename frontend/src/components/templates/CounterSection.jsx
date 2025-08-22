import CountUp from "react-countup";

const CounterSection = () => {
  return (
    <div className="bg-light-gold/5">
      <div className="container mx-auto px-20 py-16 flex flex-wrap justify-between *:flex *:flex-col *:items-center *:p-6">
        <div>
          <CountUp
            end={2.8}
            duration={3.5}
            decimals={1}
            decimal="."
            prefix="$"
            suffix="B+"
            enableScrollSpy={true}
            scrollSpyOnce={true}
            className="text-main-gold text-5xl font-[500]"
          />
          <p className="text-medium-gray text-xl mt-10">
            Luxury Properties Sold
          </p>
        </div>
        <div>
          <CountUp
            end={1200}
            duration={3.5}
            decimal="."
            suffix="  +"
            enableScrollSpy={true}
            scrollSpyOnce={true}
            className="text-main-gold text-5xl font-[500]"
          />
          <p className="text-medium-gray text-xl mt-10">Elite Clients Served</p>
        </div>
        <div>
          <CountUp
            end={150}
            duration={3.5}
            decimal="."
            suffix="  +"
            enableScrollSpy={true}
            scrollSpyOnce={true}
            className="text-main-gold text-5xl font-[500]"
          />
          <p className="text-medium-gray text-xl mt-10">Luxury Specialists</p>
        </div>
        <div>
          <CountUp
            end={15}
            duration={3.5}
            decimal="."
            suffix="  +"
            enableScrollSpy={true}
            scrollSpyOnce={true}
            className="text-main-gold text-5xl font-[500]"
          />
          <p className="text-medium-gray text-xl mt-10">Years Excellence</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
