import CountUp from "react-countup";

const CounterSection = () => {
  const stats = [
    {
      end: 2.8,
      suffix: "B+",
      prefix: "$",
      decimals: 1,
      label: "Luxury Properties Sold",
    },
    {
      end: 1200,
      suffix: "+",
      label: "Elite Clients Served",
    },
    {
      end: 150,
      suffix: "+",
      label: "Luxury Specialists",
    },
    {
      end: 15,
      suffix: "+",
      label: "Years Excellence",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-light-gold/5 to-main-gold/5 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 lg:p-10 bg-pure-white/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-4px] group"
            >
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <CountUp
                  end={stat.end}
                  duration={3.5}
                  decimals={stat.decimals || 0}
                  decimal="."
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix}
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-main-gold group-hover:scale-110 transition-transform duration-300 inline-block"
                />
              </div>
              <p className="text-medium-gray text-sm sm:text-base lg:text-lg xl:text-xl font-medium leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
