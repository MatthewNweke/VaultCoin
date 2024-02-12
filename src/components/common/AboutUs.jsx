// import finance_vid from '../assets/finance-1.mp4';
import finance_vid from '../../assets/finance-1.mp4';

const AboutUs = () => {
  return (
    <div>
      <div className="px-5 lg:px-10 xl:px-32 py-[2rem] my-[2rem] flex flex-col lg:flex-row justify-center items-center gap-7">
        <video
          className="h-[20rem]  w-[50rem] lg:w-[40rem] xl:w-[50rem]"
          muted
          autoPlay
          controls={true}
          loop
        >
          <source src={finance_vid} />
        </video>

        <div>
          <p className="mb-10 text-center text-[2rem] font-bold max-sm:text-[1.5rem]">
            About <span className="text-green-5000  ">Us</span>
          </p>
          <p className="md:text-lg text-gray-700">
            {`We are an international financial company engaged in investment activities, which are related to trading
           on financial markets and cryptocurrency exchanges performed by qualified professional traders.`}
            <br />
            <br />
            {` Our goal is to provide our investors with a reliable source of high income, while minimizing any possible risks and offering a high-quality service, allowing us to automate and simplify the relations between the investors and the trustees. We work towards increasing your profit margin by profitable investment. We look forward to you being part of our community.`}
          </p>
        </div>
      </div>

      <div className="text-[1rem] my-20 px-5 lg:px-10 xl:px-20 max-md:my-0">
        <div>
          <p className="mb-10 text-[1.4rem] font-bold max-sm:text-[1.2rem] max-sm:mb-5">
            Legal Information
          </p>
          Vaultcoin being one of the most popular staking/trading Harper in the
          industry using "Morty Karen's Arcane seal" as the most effective
          ancient security system has been a good positive experience to the
          community and serves more good than harm to the society. Our
          fundamental mission is to help our clients achieve their financial
          objectives. With offices located in the UK, Australia, Canada and
          headquartered in United States, Vaultcoin has staff with over 30 years
          of experience in combining financial development and trades. We are
          committed to pushing the boundaries of what constitutes the highest
          standards in trades and assets management. Coming to the vaultcoin
          inter concept: we assure our valuable clients the best deal and 90%
          feedback with the following SPECIAL OFFERS: 
          <ol className='list-decimal pl-3'>
            <li> Online podcast news: $50</li>
            <li>Classic team: $200 </li>
            <li>
              NonFarm payroll (NFP) Every first Friday of the month: $10,000 for
              30% interest + capital after 3 days.{' '}
            </li>
            <li>0.5% Annual Turnover</li>
            <li>
              Loan: Vaultcoin Decentralized Finance automatically offers loan
              services to investors with over $100,000 investment either in our
              normal Vaultcoin trade Decentralized Finance packages or the NFP
              plans. Investors over $100,000 are entitled to loans of $500,000 -
              1millon dollars yearly with 5% paid monthly, or the investor could
              wish to compound the interest till the time limit, provided all
              required information and identity of the investor are duly
              confirmed by the Vaultcoin Decentralized Finance loan board. Every
              investor above $100,000 is provided with a personal account
              manager and the investor has a direct communication with the
              manager in order to see that our loan offers are secured.
            </li>
          </ol>
        </div>
        <div className="mt-10">
          <p className="mb-10 text-[1.4rem] font-bold max-sm:text-[1.2rem] max-sm:mb-5">
            Safety & Fraud Protection
          </p>
          With over $5.3 Trillion traded daily in the market, we are dedicated
          to giving our clients their own share of the profit daily. As a
          leading global market maker, Fxtradings has one of the World’s Largest
          Independent traders and fund managers with clients from different
          parts of the World. Today, as a successful trade investment and asset
          management company, we are trusted by thousands of clients. Our
          sterling reputation, dedication to meeting our clients’ needs and
          innovative approach to business development are some driving forces
          behind our success.
        </div>
        <button className="text-white  py-3 px-5 bg-blue-700  rounded-lg mt-5">
          View document
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
