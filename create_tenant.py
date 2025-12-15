from keep.api.core.db import engine
from sqlmodel import Session, select
from keep.api.models.db.tenant import Tenant

with Session(engine) as session:
    tenant = session.exec(select(Tenant).where(Tenant.id == "keep")).first()
    if not tenant:
        print("Creating tenant 'keep'...")
        tenant = Tenant(id="keep", name="Keep Tenant")
        session.add(tenant)
        session.commit()
        print("Tenant created!")
    else:
        print(f"Tenant already exists: {tenant.id}")
