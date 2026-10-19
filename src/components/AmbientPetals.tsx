export function AmbientPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div className="petal text-rose-300 text-2xl" style={{ left: '5%', animationDelay: '0s' }}>🌸</div>
      <div className="petal text-pink-300 text-xl" style={{ left: '18%', animationDelay: '3s' }}>✨</div>
      <div className="petal text-rose-200 text-3xl" style={{ left: '32%', animationDelay: '6s' }}>🌷</div>
      <div className="petal text-pink-300 text-2xl" style={{ left: '50%', animationDelay: '1.5s' }}>🌺</div>
      <div className="petal text-rose-300 text-xl" style={{ left: '68%', animationDelay: '4.5s' }}>🌸</div>
      <div className="petal text-amber-200 text-2xl" style={{ left: '82%', animationDelay: '7s' }}>✨</div>
      <div className="petal text-rose-200 text-3xl" style={{ left: '92%', animationDelay: '2s' }}>💐</div>
    </div>
  );
}
