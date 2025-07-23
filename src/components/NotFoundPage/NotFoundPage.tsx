import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
	const navigate = (path) => {
		if (path === -1) {
			window.history.back();
		} else {
			window.location.href = path;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center px-6">
			<div className="max-w-2xl mx-auto text-center">
				<div className="relative mb-12">
					<div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 bg-clip-text animate-pulse">
						404
					</div>
					<div className="absolute inset-0 text-8xl md:text-9xl font-bold text-gray-100 -z-10 transform translate-x-2 translate-y-2">
						404
					</div>
				</div>

				<h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
					Упс! Страница потерялась
				</h1>
				<p className="text-lg md:text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed">
					Возможно, вы неправильно набрали адрес, или страница была перемещена.
					Но не волнуйтесь — давайте вернемся на главную!
				</p>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
					<button
						onClick={() => navigate('/')}
						className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
					>
						<Home className="w-5 h-5" />
						Вернуться на главную
					</button>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:shadow-md transition-all duration-300"
					>
						<ArrowLeft className="w-5 h-5" />
						Назад
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;