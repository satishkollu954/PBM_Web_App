import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, FileText, X } from "lucide-react";

const API_URL = "http://localhost:3005/api/events/active";

function EventModal({ event, onClose }) {
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    setShowPdf(false);
  }, [event]);

  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        >
          <div className="relative">
            <img
              src={
                event.bannerImage ||
                "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200"
              }
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
            >
              <X size={22} />
            </button>
          </div>

          <div className="p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1535] mb-4">
              {event.title}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              {event.description}
            </p>

            {event.songSheetPdf && (
              <>
                <button
                  onClick={() => setShowPdf(!showPdf)}
                  className="bg-[#c9a84c] hover:bg-[#b8953e] text-white px-5 py-3 rounded-xl flex items-center gap-2"
                >
                  <FileText size={18} />
                  {showPdf ? "Hide PDF" : "Preview Song Sheet"}
                </button>

                {showPdf && (
                  <div className="mt-6 border rounded-xl overflow-hidden h-[700px]">
                    <iframe
                      src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                        event.songSheetPdf,
                      )}`}
                      title="Song Sheet PDF"
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function EventCarousel({ events, onSelectEvent }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!emblaApi || isHovered) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex">
          {events.map((event) => (
            <div key={event._id} className="flex-[0_0_100%] min-w-0">
              <div
                onClick={() => onSelectEvent(event)}
                className="cursor-pointer relative h-[250px] md:h-[350px]"
              >
                <img
                  src={
                    event.bannerImage ||
                    "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200"
                  }
                  alt={event.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-12 left-12 right-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                    {event.title}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success && data.data && data.data.length > 0) {
          setEvents(data.data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error(error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-lg">Loading Events...</div>;
  }

  return (
    <section className="py-20 px-4 bg-[#f8f5ef]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-[#1E1535]">
          Events
        </h1>

        {events.length > 0 ? (
          <EventCarousel events={events} onSelectEvent={setSelectedEvent} />
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-[#1E1535] mb-3">
              No Upcoming Events
            </h2>

            <p className="text-gray-500">
              Please check back later for future events.
            </p>
          </div>
        )}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-[#1E1535] mb-10">
            Regular Fellowship Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-[#c9a84c]">
              <h3 className="text-xl font-bold text-[#1E1535] mb-2">
                Friday Service
              </h3>

              <p className="text-[#c9a84c] font-semibold">Nagullanka Branch</p>

              <p className="mt-3 text-gray-600">10:00 AM</p>

              <p className="text-gray-600">1:30 PM</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-[#c9a84c]">
              <h3 className="text-xl font-bold text-[#1E1535] mb-2">
                Saturday Service
              </h3>

              <p className="text-[#c9a84c] font-semibold">Marteru Branch</p>

              <p className="mt-3 text-gray-600">10:00 AM</p>

              <p className="text-gray-600">1:00 PM</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-[#c9a84c]">
              <h3 className="text-xl font-bold text-[#1E1535] mb-2">
                Sunday Service
              </h3>

              <p className="text-[#c9a84c] font-semibold">Nagullanka Branch</p>

              <p className="mt-3 text-gray-600">11:00 AM</p>

              <p className="text-gray-600">1:30 PM</p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-6 border-t-4 border-[#c9a84c]">
              <h3 className="text-xl font-bold text-[#1E1535] mb-2">
                Sunday Service
              </h3>

              <p className="text-[#c9a84c] font-semibold">Marteru Branch</p>

              <p className="mt-3 text-gray-600">7:30 AM</p>

              <p className="text-gray-600">10:00 AM</p>
            </div>
          </div>
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
