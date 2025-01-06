import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface {
  /**
   * Insert 이벤트 발생 시
   */
  beforeInsert(event: InsertEvent<any>): void {
    if (this.isBaseEntity(event.entity)) {
      event.entity.createdBy = 'system'; // 사용자 정보는 실제 시스템에서 설정
      event.entity.updatedBy = 'system';
    }
  }

  /**
   * Update 이벤트 발생 시
   */
  beforeUpdate(event: UpdateEvent<any>): void {
    if (this.isBaseEntity(event.entity)) {
      event.entity.updatedBy = 'system'; // 사용자 정보는 실제 시스템에서 설정
    }
  }

  /**
   * 해당 엔티티가 BaseEntity를 상속받았는지 확인
   */
  private isBaseEntity(entity: any): boolean {
    return entity && 'createdAt' in entity && 'updatedAt' in entity;
  }
}