import { Link } from 'react-router-dom';

const categories = [
  { name: 'Helmet', image: 'https://lh6.googleusercontent.com/proxy/gD88eTy77FjL5C-_-HqUiCaX4BqnNvz73un1EOx3YEmkxLrZ91uGbtOECc7esq-BgrvtcqiheEYKz2_qTU8IvuyYbGep3qNLPfCW5VIG8gzHJAlWywL1Jb49YtUHRp7g70Nvdu6Hpok' },
  { name: 'Jackets', image: 'https://rukminim3.flixcart.com/image/850/1000/xif0q/rider-protective-jacket/g/v/x/xs-bolt-level-2-raida-original-imagqdveapbbddyg.jpeg?q=20&crop=false' },
  { name: 'Auto Accessories', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpagd7odDNQ7VIMVg3Ge_45t4BGUtOPm3PyQ&s' },
];

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Ride Gear & Auto Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <Link key={index} to={`/shop?category=${cat.name}`}>
            <div className="rounded-lg shadow hover:shadow-xl transition overflow-hidden bg-white">
              <div className="h-56 flex items-center justify-center bg-white">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full object-contain"
                />
              </div>
              <div className="p-4 text-center font-semibold">{cat.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
