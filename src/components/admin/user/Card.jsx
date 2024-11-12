export function CardUser() {
  return (
    <div className="max-w-xxl md:max-w-xs rounded overflow-hidden shadow-lg">
      <div className="relative">
        <img className="w-full clippy" src="https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Sunset in the mountains" />
        <div
          className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center">
        </div>
      </div>
      <div className="pt-3 pb-5 px-5 flex flex-col items-center">
        <p className="font-bold text-3xl">John Doe</p>
        <p className="text-gray-500 mb-2">Product Designer</p>
        <p className="text-center mb-2">Apparently we had reached a great height in the atmosphere</p>
        <div className="flex flex-row align-center justify-center">
          3 svg
        </div>
        <div className="mt-5 flex flex-row justify-center items-start">
          <div className="px-3 text-center">
            <p className="text-gray-500">Following</p>
            <b className="text-2xl">561</b>
          </div>
          <div className="px-3 text-center">
            <p className="text-gray-500">Tweets</p>
            <b className="text-2xl">1,337</b>
          </div>
          <div className="px-3 text-center">
            <p className="text-gray-500">Followers</p>
            <b className="text-2xl">781</b>
          </div>
        </div>
      </div>
    </div>
  );
}