"use client";

import Header from "@/app/components/Header";
import SelectAutocomplete from "@/app/components/SelectAutoComplete";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Create = () => {
  const [record, setRecord] = useState({
    firstName: "",
    lastName: "",
    country: "",
    accountType: "",
    username: "",
    email: "",
    contactNumber: "",
    image: "",
    userId: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const session = useSession();
  if (!session) {
    redirect("/login");
  }

  useEffect(() => {
    if (session) {
      setRecord({
        ...record,
        userId: (session && session.data?.user?.id) || "",
      });
    }
  }, [session]);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const createRecord = await fetch("/api/records/create", {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await createRecord.json();
      if (data.success) {
        setLoading(false);
        redirect("/home");
      } else {
        setLoading(false);
        console.error(data.message);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <Header />
      <form className="form-control w-full max-w-xs pt-5 text-xs" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Country</span>
          </label>
          <SelectAutocomplete
            label="Status"
            options={[
              { value: "India", label: "India" },
              { value: "Philippines", label: "Philippines" },
            ]}
            value={record.country}
            onChange={(value) => {
              setRecord({ ...record, country: value });
            }}
            isSearchable
            isClearable
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Account Type</span>
          </label>
          <SelectAutocomplete
            label="Status"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "User", label: "User" },
            ]}
            value={record.accountType}
            onChange={(value) => {
              setRecord({ ...record, accountType: value });
            }}
            isSearchable
            isClearable
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRecord({ ...record, username: e.target.value })}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">First Name</span>
          </label>
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) =>
              setRecord({ ...record, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Last Name</span>
          </label>
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRecord({ ...record, lastName: e.target.value })}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRecord({ ...record, email: e.target.value })}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Contact Number</span>
          </label>
          <input
            type="text"
            placeholder="Contact Number"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) =>
              setRecord({ ...record, contactNumber: e.target.value })
            }
          />
        </div>
        {/* photo upload */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="text-xs">Photo</span>
          </label>
          <input
            type="file"
            placeholder="Photo"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setRecord({ ...record, image: e.target.value })}
          />
        </div>
        <div className="form-control w-full max-w-xs pt-2">
          <button className="btn btn-primary" type="submit" >
            Submit
          </button>
        </div>
      </form>
      {loading && <span className="loading loading-spinner loading-lg"></span>}
    </div>
  );
};

export default Create;
