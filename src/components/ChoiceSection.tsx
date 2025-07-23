import Link from 'next/link';

const ChoiceSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">今夜の気分は、どっち？</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <Link href="/watch-anything">
            <div className="border-2 border-gray-800 p-8 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300 cursor-pointer">
              <h3 className="text-2xl font-bold">ただ、観たいだけの夜</h3>
            </div>
          </Link>
          <Link href="/think-too-much">
            <div className="border-2 border-gray-800 p-8 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300 cursor-pointer">
              <h3 className="text-2xl font-bold">意味を、考えてしまう夜</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChoiceSection;
