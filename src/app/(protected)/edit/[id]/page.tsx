"use client";

import Header from "@/app/components/Header";
import SelectAutocomplete from "@/app/components/SelectAutoComplete";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Edit = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
  const [record, setRecord] = useState({
    id: "",
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
        id: params.id,
      });
    }
    const fetchRecord = async () => {
      try {
        const fetchRecord = await fetch(`/api/records/${params.id}`);
        const data = await fetchRecord.json();
        if (data.success) {
          setRecord(data.record);
        } else {
          console.error(data.message);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecord();
  }, [session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateRecord = await fetch("/api/records/update", {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await updateRecord.json();
      if (data.success) {
        setLoading(false);
        router.push("/home");
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
      <form
        className="form-control w-full max-w-xs pt-5 text-xs"
        onSubmit={handleSubmit}
      >
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
            value={{ value: record.country, label: record.country }}
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
            value={{ value: record.accountType, label: record.accountType }}
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
            value={record.username}
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
            value={record.firstName}
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
            value={record.lastName}
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
            value={record.email}
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
            value={record.contactNumber}
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
            value={record.image}
          />
        </div>
        <div className="form-control w-full max-w-xs pt-2">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
      {loading && <span className="loading loading-spinner loading-lg"></span>}
    </div>
  );
};

export default Edit;
