export const ProfileBanner = () => {
  return (
    <div className="w-full px-4 md:px-8 pt-6 md:pt-8">
      <div className="relative h-40 md:h-48 w-full overflow-hidden rounded-2xl shadow-elevated">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            User Profile
          </h1>
        </div>
      </div>
    </div>
  );
};
