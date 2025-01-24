import { fetch } from "@/utils/fetch";

export const useFirestore = (collectionName) => {
  const add = async (data) => {
    const docRef = await fetch(`/api/firestore/${collectionName}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return docRef.id;
  };

  const update = async (docId, data) => {
    const docRef = await fetch(`/api/firestore/${collectionName}/${docId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return docRef.id;
  };

  const remove = async (docId) => {
    const docRef = await fetch(`/api/firestore/${collectionName}/${docId}`, {
      method: "DELETE",
    });
    return docRef.id;
  };

  const getAll = async (conditions = [], sortBy = null) => {
    let q = `/api/firestore/${collectionName}`;

    if (conditions.length) {
      conditions.forEach((condition) => {
        q = `${q}?${condition.field}=${condition.value}`;
      });
    }

    if (sortBy) {
      q = `${q}&sortBy=${sortBy.field}&sortDirection=${sortBy.direction}`;
    }

    const response = await fetch(q);
    const data = await response.json();
    return data;
  };

  return { add, update, remove, getAll };
};
