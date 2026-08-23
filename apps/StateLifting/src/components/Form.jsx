import { useState } from "react";
const INI_VALUE = {
  name: "",
  email: "",
};

const Form = ({ getData }) => {
  const [values, setvalues] = useState({ ...INI_VALUE });

  const { name, email } = values;

  const handleChange = (e) => {
    setvalues({
      ...values,
      [e.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    event.preventDefault();
    console.log(values);
    getData(values);
  };
  return (
    <div>
      <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto  min-h-[calc(100vh-4rem)] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/30 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="flex items-center bg-white p-8 text-slate-900 sm:p-12">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="name"
                  >
                    Your name
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    id="name"
                    name="name"
                    placeholder="Alex Morgan"
                    required
                    type="text"
                    value={name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-slate-700"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    id="email"
                    name="email"
                    placeholder="alex@example.com"
                    required
                    type="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 active:scale-[0.99]"
                type="submit"
              >
                Send message <span aria-hidden="true">-&gt;</span>
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Form;
